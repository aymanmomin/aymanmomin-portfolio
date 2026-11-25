# Editing the story

All on-page copy lives in two files:
- `src/story/stops.india.ts` (stops 1 to 7)
- `src/story/stops.canada.ts` (stops 8 to 11)

Each stop has a headline, a period, one key stat, a media slot and express text with a pop-up.
`src/story/stops.test.ts` fails if on-page express copy goes over 1,100 words, if a detailed-only fact
leaks into the express route, or if a wording decision from `docs/content/claims.md` is broken.

## Adding a photo or video
Put the file in `public/media/` and set `src` (and `alt`) on that stop's media entry, for example
`src: '/media/tech-guy.jpg'`. The labelled placeholder is replaced by the real file.

## Before launch
Set `SHOW_EMPTY_MEDIA_SLOTS` to `false` in `src/story/config.ts` so visitors never see placeholders.
Add captions to any video.

## Previewing
Run `npm run dev` and open the site. The story is the default view. Add `?story=0` to see the earlier standard layout.