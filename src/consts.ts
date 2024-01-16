const CONSTS = {
  mainPageUrl:
    (import.meta.env.VITE_MAIN_PAGE_URL as string) ||
    'https://r-placer.seabeya.com/',
  workspacePageUrl:
    (import.meta.env.VITE_WORKSPACE_PAGE_URL as string) ||
    'https://r-placer.seabeya.com/workspace/',
  githubUrl: 'https://github.com/seabeya/r-placer',
};

export default CONSTS;
