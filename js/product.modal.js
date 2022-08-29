export default class Products {
  constructor(
    id,
    name,
    price,
    screen,
    blackCamere,
    frontCamera,
    img,
    desc,
    type,
    soLuong
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.blackCamere = blackCamere;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.soLuong = soLuong;
  }
  tongTien() {
    return this.soLuong * this.price;
  }
}
