import { createGlobalStyle } from 'styled-components';
import { reboot } from 'styled-reboot';

import { fontFaces } from './font-faces';

export const GlobalStyle = createGlobalStyle`
    ${fontFaces}
    ${reboot}

    html,
    body,
    #root {
        height: 100%;
    }
`;
