export default [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        invert_lightness: true,
      },
      {
        saturation: 10,
      },
      {
        lightness: 30,
      },
      {
        gamma: 0.5,
      },
      {
        hue: "#435158",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        color: "#425873",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#131b27",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#06080c",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
