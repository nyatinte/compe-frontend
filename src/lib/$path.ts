export const pagesPath = {
  "competition": {
    "create": {
      $url: (url?: { hash?: string }) => ({ pathname: '/competition/create' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/competition' as const, hash: url?.hash })
  },
  "mypage": {
    "config": {
      $url: (url?: { hash?: string }) => ({ pathname: '/mypage/config' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/mypage' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
