import FetchFactory from './factory';

class DKHPModule extends FetchFactory {
  private readonly RESOURCE =
    'https://portal.ctdb.hcmus.edu.vn/dang-ky-hoc-phan';

  private readonly HEADERS: HeadersInit = {
    Cookie: document.cookie,
    'X-OFFICIAL-REQUEST': 'TRUE',
    'X-Requested-With': 'XMLHttpRequest',
  };

  private getResourceUrl(...args: string[]) {
    return this.RESOURCE + (args.length > 0 ? `/${args.join('/')}` : '');
  }

  async addSubject(
    program: 'apcs' | 'clc',
    subjectId: string | number,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('action', 'addMonDangKy');
    formData.append('data', subjectId.toString());

    return this.call(this.getResourceUrl(`sinh-vien-${program}`), 'POST', {
      body: formData,
      options: {
        headers: { ...this.HEADERS },
      },
    });
  }

  async removeSubject(
    program: 'apcs' | 'clc',
    subjectId: string | number,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('action', 'delMonDangKy');
    formData.append('data', subjectId.toString());

    return this.call(this.getResourceUrl(`sinh-vien-${program}`), 'POST', {
      body: formData,
      options: {
        headers: { ...this.HEADERS },
      },
    });
  }

  async getSubjectList(
    program: 'apcs' | 'clc',
    studentId: string | number,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('action', 'loadDangKyHocPhan');
    formData.append('data', studentId.toString());

    return this.call(this.getResourceUrl(`sinh-vien-${program}`), 'POST', {
      body: formData,
      options: {
        headers: { ...this.HEADERS },
      },
    });
  }
}

export default DKHPModule;
