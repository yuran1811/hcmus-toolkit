/**
 * Auto Registration for Subjects
 * @ref https://github.com/beer-psi/hcmus-ctda-calendar/blob/trunk/auto-registration.js
 * @author beer-psi
 * Refactor by @yuran1811
 */

import DKHPModule from '../api/dkhp';

/**
 * @param href Current page href (document.location.pathname)
 * @param selectedSubjectIDs List of subject IDs to register
 */
export const autoRegistration = async (
  href: string,
  ...selectedSubjectIDs: (number | string)[]
) => {
  if (
    !['apcs', 'clc']
      .map((_) => `/dang-ky-hoc-phan/sinh-vien-${_}`)
      .includes(href)
  ) {
    return;
  }

  const dkhpModule = document.querySelector('.ModCTDBDKHocPhanC');
  if (!dkhpModule) return;

  const dkhpTable = dkhpModule.querySelector('#divMonChuaDK table tbody');
  if (!dkhpTable) return;

  const vmDKHP = ko.dataFor(dkhpModule) as DKHPViewModel | undefined;
  if (!vmDKHP) return;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeName !== 'TR') continue;

        const row = addedNode as HTMLTableRowElement;
        const cell = row.querySelectorAll('td')[1];
        if (!cell) continue;

        const vm = ko.dataFor(row);
        cell.textContent += ` (${vm.MaMG})`;
      }
    }
  });
  observer.observe(dkhpTable, { childList: true });

  let textareaDebounce: ReturnType<typeof setTimeout> | number = 0;
  const textarea = document.createElement('textarea');
  textarea.placeholder =
    'Enter internal subject IDs (shown in parentheses) separated by whitespace.';
  textarea.value = localStorage.getItem('registeredSubjectIDs') ?? '';
  textarea.addEventListener('keyup', () => {
    if (textareaDebounce) clearTimeout(textareaDebounce);

    textareaDebounce = setTimeout(() => {
      localStorage.setItem('registeredSubjectIDs', textarea.value);
    }, 1000);
  });

  const button = document.createElement('button');
  button.textContent = 'Bulk register subjects';
  button.onclick = async (e) => {
    e.preventDefault();

    const subjectIDs = textarea.value
      .split(/\s+/gu)
      .map((s) => Number(s))
      .concat(selectedSubjectIDs.map((s) => Number(s)));
    const validSubjectIDs = vmDKHP.dsChuaDangKy().map((s) => s.MaMG);
    const registeringSubjectIDs = subjectIDs.filter((id) =>
      validSubjectIDs.includes(id),
    );

    if (registeringSubjectIDs.length === 0) {
      toastr.warning('No valid subjects entered.');
      return;
    }

    const program = href.split('-').pop() as 'apcs' | 'clc';
    const result = await Promise.allSettled(
      registeringSubjectIDs.map((id: number | string) => {
        const ajax = new DKHPModule(fetch);
        return ajax.addSubject(program, id);
      }),
    );

    vmDKHP.loadDangKyHocPhan();

    if (result.some((r) => r.status === 'rejected')) {
      const errors = result
        .filter((r) => r.status === 'rejected')
        .map((r) => r.reason.Message);

      $.alert({
        type: 'red',
        title: 'Could not register some subjects',
        content: errors.join('<br>'),
        buttons: {
          ok: {
            text: 'Ok',
          },
        },
      });
    } else {
      toastr.success('Successfully registered subjects.');
    }
  };

  dkhpModule
    .querySelector('.panel .panel-body')
    ?.insertAdjacentElement('beforeend', textarea);
  dkhpModule
    .querySelector('.panel .panel-body')
    ?.insertAdjacentElement('beforeend', document.createElement('br'));
  dkhpModule
    .querySelector('.panel .panel-body')
    ?.insertAdjacentElement('beforeend', button);

  // if we have prefilled subjects and we can register subjects now, do it
  if (localStorage.getItem('registeredSubjectIDs') && vmDKHP.ok()) {
    setTimeout(() => button.click(), 1500);
  }
};
