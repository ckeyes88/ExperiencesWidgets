/** @jsx h */
import { h, FunctionComponent } from "preact";

export type ThumbsUpProps = {
  color?: string;
  width?: number;
  height?: number;
  strokeSize?: number;
};

export const ThumbsUp: FunctionComponent<ThumbsUpProps> = ({
  color = "#000",
  width = 42,
  height = 42,
  strokeSize = 0.5,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.2595 4.58049C18.4301 2.12611 20.7585 0.228237 23.268 0.852987L23.9531 1.02624C25.1685 1.33074 26.2474 2.22324 26.6096 3.55936C27.1871 5.70136 28.0088 10.1507 26.7724 15.3981C27.1589 15.3447 27.5467 15.3001 27.9353 15.2642C29.8069 15.0936 32.3164 15.0752 34.5397 15.8155C35.8995 16.2696 37.149 17.6031 37.6898 19.1571C38.1727 20.5536 38.1097 22.2074 37.0755 23.7062C37.2277 24.0186 37.3459 24.3415 37.4378 24.6591C37.6399 25.3679 37.7344 26.1475 37.7344 26.9061C37.7344 27.6647 37.6399 28.4444 37.4378 29.1531C37.3354 29.5075 37.2015 29.8697 37.0177 30.2136C37.4614 31.2295 37.2986 32.3635 37.0099 33.2271C36.7143 34.0799 36.2816 34.8787 35.7289 35.5922C35.8706 35.9912 35.9284 36.4112 35.9284 36.8129C35.9284 37.6135 35.6947 38.4535 35.2642 39.2069C34.3875 40.7451 32.6471 41.9999 30.1875 41.9999V39.3749C31.6654 39.3749 32.5526 38.6609 32.9858 37.9049C33.1825 37.5737 33.2918 37.1979 33.3034 36.8129C33.3034 36.4979 33.2115 36.3797 33.1984 36.3666L32.2691 35.4374L33.1957 34.5081C33.726 33.9805 34.2641 33.1667 34.5214 32.3976C34.7944 31.5786 34.6343 31.24 34.5082 31.1166L33.5816 30.1874L34.5082 29.2581C34.6211 29.1479 34.7839 28.8906 34.9125 28.4312C35.0385 27.9929 35.1094 27.46 35.1094 26.9061C35.1094 26.3522 35.0385 25.8194 34.9125 25.381C34.7812 24.9242 34.6211 24.6644 34.5082 24.5541L33.5816 23.6249L34.5082 22.6956C35.4349 21.7716 35.4874 20.824 35.2091 20.0181C34.8889 19.0994 34.1696 18.4615 33.7103 18.3066C31.9961 17.737 29.9119 17.7186 28.1715 17.8761C27.2059 17.966 26.2468 18.1159 25.2997 18.325L25.263 18.3329L25.2551 18.3355C25.0271 18.3921 24.7881 18.3865 24.563 18.3193C24.3379 18.252 24.1349 18.1256 23.9754 17.9531C23.8158 17.7807 23.7055 17.5686 23.6558 17.3389C23.6062 17.1093 23.6191 16.8706 23.6933 16.6476C25.0142 12.6357 25.1464 8.32724 24.0739 4.24186C23.9951 3.95049 23.7379 3.67749 23.3179 3.57249L22.6301 3.40186C21.8269 3.19974 20.9449 3.81136 20.8792 4.76161C20.6824 7.60186 20.2519 10.4054 19.614 12.2429C19.1573 13.5606 18.0311 15.5714 16.3643 17.4325C14.6921 19.3015 12.3769 21.1337 9.5025 21.916C8.46825 22.1995 7.875 22.9555 7.875 23.6222V34.1275C7.875 34.81 8.4525 35.4794 9.32662 35.5712C12.7207 35.9309 14.4086 36.9625 15.8655 37.8497L15.9705 37.9154C16.6793 38.3459 17.2699 38.6924 18.0075 38.947C18.7346 39.1964 19.6613 39.3749 21 39.3749H30.1875V41.9999H21C19.4119 41.9999 18.1912 41.7872 17.1517 41.4276C16.2579 41.1012 15.4038 40.675 14.6055 40.1571L14.4795 40.0784C13.1565 39.2725 11.8571 38.4797 9.051 38.1831C7.04025 37.9679 5.25 36.3456 5.25 34.1249V23.6249C5.25 21.3936 7.04813 19.8659 8.81213 19.3855C11.0408 18.7765 12.9439 17.3196 14.4086 15.6842C15.8786 14.0384 16.8079 12.3242 17.136 11.3819C17.6584 9.87249 18.0705 7.34199 18.2595 4.58311V4.58049Z"
        fill="#424242"
        stroke={color}
        strokeWidth={strokeSize}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="42" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);