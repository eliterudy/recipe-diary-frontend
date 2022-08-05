const colorCodes: Object = {
  default: '#151f2d',
};

const icons: any = {
  bookmark_selected: require('../assets/icons/bookmark_selected.png'),
  bookmark_hover: require('../assets/icons/bookmark_hover.png'),
  bookmark_unselected: require('../assets/icons/bookmark_unselected.png'),
  search_black: require('../assets/icons/search_black.png'),
  search_white: require('../assets/icons/search_white.png'),
  app_logo: require('../assets/icons/app_logo.png'),
};

const images: any = {
  route_not_found: require('../assets/images/404-error.png'),
  server_down: require('../assets/images/server-down.jpg'),
  no_internet: require('../assets/images/no_internet.png'),
  food_background: require('../assets/images/food-background-1.jpg'),
};

const gifs: any = {
  loadingGif: '../assets/gifs/loader.gif',
};

const randomColorGenerator: any = () => {
  const colors = [
    '#2C3639',
    '#395B64',
    '#774360',
    '#B25068',
    '#51557E',
    '#A27B5C',
    '#E7AB79',
    '#A91079',
    '#816797',
    '#C74B50',
    '#570530',
    '#04293A',
    '#064663',
    '#A13333',
    '#864879',
    '#1E5128',
    '#3D2C8D',
    '#B42B51',
    '#334756',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export {colorCodes, icons, randomColorGenerator, images, gifs};
