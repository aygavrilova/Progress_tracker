import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export default createGlobalStyle`
    :root {      
      --font-family: 'Caveat', sans-serif;
      --max-content-width: 1200px;
      --finn-color: #6F4C5B;
      --hemp-color: #9E7777;
      --raffia-color: #DEBA9D;
      --pipi-color: #F5E8C7;
      --floral-white-color:  #FFFBE9;
      --gray-color: #EEEEEE;
    }
/* 
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    } */

    body {
        line-height: 1;
        margin: 0;
        padding: 0;
        border: 0;
    }
    /* }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    } */
    /* h1, h2, h3, p {
      color: var(--finn-color);
      font-family: 'Caveat', sans-serif;
    } */
   
`;
