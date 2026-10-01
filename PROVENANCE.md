# Provenance and ownership

Updated: 2026-10-01

The portfolio is a repository-native implementation for Saurabh Shubham. The homepage redesign follows the layout and visual style of [bobby.so](https://www.bobby.so/), as requested: a narrow white page, compact lowercase type, blue links, a dated timeline, interactive portrait, and work previews. Personal content comes from this repository's evidence matrix and master resume. Bobby's identity, work history, portrait, and project images are not used.

Homepage HTML and JavaScript are implemented locally. The resume page shares the homepage font, white background, blue links, and narrow column, with the full resume rendered as native HTML. The Inter Regular font was downloaded from the reference site's public font asset; Inter is by Rasmus Andersson and licensed under the SIL Open Font License, included at `public/fonts/OFL.txt`. No font or script is fetched remotely by visitors.

`public/images/saurabh-avatar.webp` was generated with the built-in imagegen tool using Saurabh's existing `public/images/profile.png` as the identity reference, then encoded as WebP with transparency preserved. Prompt: six consistent floating-head portraits of Saurabh wearing his navy bucket hat and round sunglasses, arranged in a 3-by-2 sprite grid, looking left, forward, right, down, up, and surprised. Work preview covers are original HTML/CSS with factual employer and project descriptions.

`@playwright/test` is an npm development-only test dependency and is not sent to site visitors. The resume build uses third-party TeX tooling and packages; generated resume content and layout source remain repository-authored. Product names, employer names, and trademarks identify factual experience and remain owned by their respective holders.

Runtime asset validation checks local HTML and stylesheet references. Historical provenance has not been re-audited.

## Timeline logos and city illustrations (2026-10-01)

Student chapter titles follow the operator’s confirmation (S21); dates and activities follow the LinkedIn export. The timeline's company roles, internship dates, and locations follow the operator-provided LinkedIn export (S20 in `brand/evidence-matrix.md`). The export remains outside the repository; no phone number or full private document is published. The Facebook scholarship remains supported by the public [LinkedIn profile](https://www.linkedin.com/in/saurabh-shubham/) and earlier candidate evidence. [Udacity's program page](https://www.udacity.com/blog/introducing-the-pytorch-scholarship-challenge-from-facebook/) describes the scholarship; the portfolio does not claim selection for the subsequent full nanodegree scholarship.

All displayed logos are cached locally in `public/images/logos/`, identify the corresponding employer, educational institution, or program, and remain the property of their trademark holders. Sources:

- Regulation Check: [official brand SVG](https://regulationcheck.com/static/logo.svg), cached unchanged from the owner’s product website.
- GROPYUS: white wordmark extracted unchanged from the inline SVG on [gropyus.com](https://www.gropyus.com/).
- Sigmoid: [official white logo](https://www.sigmoid.com/wp-content/uploads/2025/12/sigmoid-white-logo@2x.png).
- Amdocs: [CompaniesLogo wordmark](https://companieslogo.com/img/orig/DOX_BIG-fca821f4.svg?t=1742469639), attributed to Amdocs; editorial identification only.
- BIT Mesra: [official institute emblem](https://www.bitmesra.ac.in/sitelogo/bit-newlogo.png).
- Hasura: [official brand SVG](https://res.cloudinary.com/dh8fp23nd/image/upload/v1711457032/main-web/hasura_logo_primary_lightbg_n0xhz8.svg), linked from Hasura's GitHub documentation.
- Finnov Softwares Services: [Inc42 company-profile logo](https://static-asset.inc42.com/logo/finnov-softwares-services.png).
- Schooglink: [official logo](https://schooglink.com/logo.png).
- IIT Kharagpur: [official institute emblem](https://www.iitkgp.ac.in/assets/pages/images/logo.png), displayed with the emblem in view using CSS to identify the online Kharagpur Winter of Code program.
- ACM: [Simple Icons ACM asset](https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/acm.svg), distributed under Simple Icons’ CC0 license; the ACM trademark remains owned by ACM.
- IEEE: [official white logo](https://brand-experience.ieee.org/wp-content/themes/porto-child/img/ieee-logo.png).
- PyTorch: [official wordmark](https://pytorch.org/wp-content/uploads/2024/10/logo.svg).

The engineering mark is original portfolio artwork. Berlin, Pune, Bengaluru, Patna, and Gurgaon skyline SVGs in `public/images/places/` are original code-drawn illustrations created for this portfolio. Landmarks are stylized illustrations, not workplace photographs or precise maps. No external assets load at runtime; logos and illustrations load only when a preview is opened.
