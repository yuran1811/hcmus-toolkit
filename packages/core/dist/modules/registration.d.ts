/**
 * Auto Registration for Subjects
 * @ref https://github.com/beer-psi/hcmus-ctda-calendar/blob/trunk/auto-registration.js
 * @author beer-psi
 * Refactor by @yuran1811
 */
/**
 * @param href Current page href (document.location.pathname)
 * @param selectedSubjectIDs List of subject IDs to register
 */
export declare const autoRegistration: (href: string, ...selectedSubjectIDs: (number | string)[]) => Promise<void>;
