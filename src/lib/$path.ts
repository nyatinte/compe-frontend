export const pagesPath = {
  mypage: {
    config: {
      $url: (url?: { hash?: string }) => ({ pathname: '/mypage/config' as const, hash: url?.hash }),
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/mypage' as const, hash: url?.hash }),
  },
  test: {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash }),
}

export type PagesPath = typeof pagesPath
