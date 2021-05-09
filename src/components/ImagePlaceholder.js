import React from "react";

const placeholder = ({
  width,
  height,
  text,
  textColor = "#aaaaaa",
  bgColor = "#efefef",
  fontFamily = "Roboto",
  fontSize = 16,
  dy = 5,
  fontWeight = "bold"
}) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect fill="${bgColor}" width="${width}" height="${height}" rx="6"/>
  <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>
</svg>`;

export const ImagePlaceholder = ({ url, width, text }) => {
  const cleaned = placeholder({
    width,
    height: width,
    text: text || width + "x" + width
  })
    .replace(/[\t\n\r]/gim, "")
    .replace(/\s\s+/g, " ")
    .replace(/'/gim, "\\i");

  const encoded = encodeURIComponent(cleaned)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");

  return (
    <img
      src={`${url}/${width}`}
      media={`(min-width: ${width}px)`}
      onError={e => {
        e.target.onerror = null;
        e.target.src = `data:image/svg+xml;charset=UTF-8,${encoded}`;
      }}
      style={{ borderRadius: 6 }}
      alt=""
    />
  );
};
