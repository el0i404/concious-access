import { css } from 'styled-components';

export const fontFaces = css`
  // Noto Sans from Adobe Fonts
  // https://fonts.adobe.com/fonts/noto-sans
  // 'https://use.typekit.net/inl5djc.css')
  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/d9dfc1/00000000000000003b9b2578/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/d9dfc1/00000000000000003b9b2578/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
        format('woff'),
      url('https://use.typekit.net/af/d9dfc1/00000000000000003b9b2578/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
        format('opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 300;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/dbd402/00000000000000003b9b2579/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/dbd402/00000000000000003b9b2579/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3')
        format('woff'),
      url('https://use.typekit.net/af/dbd402/00000000000000003b9b2579/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3')
        format('opentype');
    font-display: auto;
    font-style: italic;
    font-weight: 300;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/5d1912/00000000000000003b9b257a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/5d1912/00000000000000003b9b257a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('woff'),
      url('https://use.typekit.net/af/5d1912/00000000000000003b9b257a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 400;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/1319af/00000000000000003b9b257b/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/1319af/00000000000000003b9b257b/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
        format('woff'),
      url('https://use.typekit.net/af/1319af/00000000000000003b9b257b/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
        format('opentype');
    font-display: auto;
    font-style: italic;
    font-weight: 400;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/a91117/00000000000000003b9b257c/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/a91117/00000000000000003b9b257c/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3')
        format('woff'),
      url('https://use.typekit.net/af/a91117/00000000000000003b9b257c/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3')
        format('opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 500;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/c5fa99/00000000000000003b9b257d/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i5&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/c5fa99/00000000000000003b9b257d/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i5&v=3')
        format('woff'),
      url('https://use.typekit.net/af/c5fa99/00000000000000003b9b257d/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i5&v=3')
        format('opentype');
    font-display: auto;
    font-style: italic;
    font-weight: 500;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/5e3d62/00000000000000003b9b257e/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/5e3d62/00000000000000003b9b257e/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3')
        format('woff'),
      url('https://use.typekit.net/af/5e3d62/00000000000000003b9b257e/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3')
        format('opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 600;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/c568cc/00000000000000003b9b257f/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i6&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/c568cc/00000000000000003b9b257f/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i6&v=3')
        format('woff'),
      url('https://use.typekit.net/af/c568cc/00000000000000003b9b257f/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i6&v=3')
        format('opentype');
    font-display: auto;
    font-style: italic;
    font-weight: 600;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/dea00e/00000000000000003b9b2580/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/dea00e/00000000000000003b9b2580/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
        format('woff'),
      url('https://use.typekit.net/af/dea00e/00000000000000003b9b2580/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
        format('opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 700;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'noto-sans';
    src: url('https://use.typekit.net/af/a48253/00000000000000003b9b2581/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/a48253/00000000000000003b9b2581/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3')
        format('woff'),
      url('https://use.typekit.net/af/a48253/00000000000000003b9b2581/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3')
        format('opentype');
    font-display: auto;
    font-style: italic;
    font-weight: 700;
    font-stretch: normal;
  }

  .tk-noto-sans {
    font-family: 'noto-sans', sans-serif;
  }
`;
