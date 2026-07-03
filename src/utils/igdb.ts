type IGDBImageSize =
  | 'cover_small' // 90 x 128 | fit
  | 'screenshot_med' // 569 x 320 | lfill, center gravity
  | 'cover_big' // 264 x 374 | fit
  | 'logo_med' // 284 x 160 | fit
  | 'screenshot_big' // 889 x 500 | lfill, center gravity
  | 'screenshot_huge' // 1280 x 720 | lfill, center gravity
  | 'thumb' // 90 x 90 | thumb, center gravity
  | 'micro' // 35 x 35 | thumb, center gravity
  | '720p' // 1280 x 720 | fit, center gravity
  | '1080p' // 1920 x 1080 | fit, center gravity

export function replaceImageSize(
  url: string,
  newSize: IGDBImageSize = 'cover_big',
) {
  return url.replace('t_thumb', `t_${newSize}`)
}
