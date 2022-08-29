import { renderDSSP, renderGioHang } from "./product.controller.js";
import Products from "./product.modal.js";
const BASE_URL = "https://62fb79d0abd610251c09c2f7.mockapi.io";
let ProductList = [];
let GioHang = [];
let dssp = [];

const DSSP_LOCALSTORGE = "DSSP_LOCALSTORGE";

let getProducts = () => {
  axios({
    url: `${BASE_URL}/Products`,
    method: "GET",
    body: {
      foo: "bar",
    },
  })
    .then((res) => {
      ProductList = res.data;
      console.log("ProductList_axios: ", ProductList);
      renderDSSP(ProductList);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
getProducts();

// console.log("ProductList_out_axios: ", ProductList);
document.getElementById("show_gio_hang").addEventListener("click", () => {
  document.querySelector(".side-nav").style.right = "0px";
  document.querySelector(".cover").style.display = "block";
  // console.log("aaaa");
  if (document.getElementById("gio_hang").style.display != "block") {
    document.getElementById("gio_hang").style.display = "block";
    let dsspJson = localStorage.getItem(DSSP_LOCALSTORGE);
    if (dsspJson != null) {
      dssp = JSON.parse(dsspJson);
      dssp.forEach((item, index) => {
        let sp = item;
        dssp[index] = new Products(
          sp.id,
          sp.name,
          sp.price,
          sp.screen,
          sp.backCamera,
          sp.frontCamera,
          sp.img,
          sp.desc,
          sp.type,
          sp.soLuong
        );
      });
      // console.log("dssp", dssp);
    }

    renderGioHang(dssp);
  } else {
    document.getElementById("gio_hang").style.display = "none";
  }
});
document.getElementById("radioSelect").addEventListener("change", () => {
  // console.log("ProductList_select: ", ProductList);

  let typePhone = document.querySelector(
    'input[name="typePhone"]:checked'
  ).value;
  console.log("typePhone: ", typePhone);

  let arrTypeSelect = [];

  ProductList.forEach((item) => {
    if (item.type == typePhone) {
      arrTypeSelect.push(item);
    }
  });
  // console.log("arrTypeSelect: ", arrTypeSelect);

  renderDSSP(arrTypeSelect);
});

// add sp vao gio hang
let addToCart = (id) => {
  let index = ProductList.findIndex((item) => {
    return item.id == id;
  });
  let cardItem = {
    ...ProductList[index],
    soLuong: 1,
    tongTien: function () {
      return this.price * this.soLuong;
    },
  };
  // console.log("cardItem: ", cardItem);

  let indexGioHang = GioHang.findIndex((item) => {
    return item.id == cardItem.id;
  });

  if (indexGioHang == -1) {
    GioHang.push(cardItem);
  } else {
    GioHang[indexGioHang].soLuong++;
  }
  // console.log("GioHang: ", GioHang);

  //tao json
  let dsspJson = JSON.stringify(GioHang);
  // lưu json vào localstorge
  localStorage.setItem(DSSP_LOCALSTORGE, dsspJson);
};
window.addToCart = addToCart;

let removeCart = (id) => {
  let index = GioHang.findIndex((item) => {
    console.log("item.id: ", item.id);
    console.log("id: ", id);
    return item.id == id;
  });
  console.log("index: ", index);
  GioHang.splice(index, 1);
  console.log("GioHang: ", GioHang);
  //tao json
  let dsspJson = JSON.stringify(GioHang);
  // lưu json vào localstorge
  localStorage.setItem(DSSP_LOCALSTORGE, dsspJson);
  renderGioHang(GioHang);
};
window.removeCart = removeCart;

// ham trnag giam so luong
let tangGiamSoLuong = (id, action) => {
  let index = GioHang.findIndex((item) => {
    // console.log("item.id: ", item.id);
    console.log("action: ", action);
    return item.id == id;
  });
  // console.log("index: ", index);

  // console.log("Gio Hang", GioHang[index]);
  if (index != -1) {
    let sl = GioHang[index].soLuong;
    // console.log("sl: ", sl);
    if (action == "tang") {
      sl++;
      GioHang[index].soLuong = sl;
    } else {
      sl--;
      GioHang[index].soLuong = sl;
      if (sl == 0) {
        GioHang.splice(index, 1);
      }
    }
  }
  //tao json
  let dsspJson = JSON.stringify(GioHang);
  // lưu json vào localstorge
  localStorage.setItem(DSSP_LOCALSTORGE, dsspJson);
  renderGioHang(GioHang);
};
window.tangGiamSoLuong = tangGiamSoLuong;

document.getElementById("closeGioHang").addEventListener("click", () => {
  document.getElementById("gio_hang").style.display = "none";
  document.querySelector(".cover").style.display = "none";
});
//gio hang
document.getElementById(
  "show_gio_hang"
).innerHTML = `<div><button><i class="fa fa-shopping-cart"></i></button></div>`;

let clearCart = () => {
  GioHang = [];
  //tao json
  let dsspJson = JSON.stringify(GioHang);
  // lưu json vào localstorge
  localStorage.setItem(DSSP_LOCALSTORGE, dsspJson);
  renderGioHang(GioHang);
};

window.clearCart = clearCart;

let thanhToan = () => {
  document.getElementById("daThanhToan").style.display = "flex";
  document.getElementById("gio_hang").style.display = "none";
  let tongTienThanhToan = 0;

  GioHang.forEach((item) => {
    tongTienThanhToan += item.tongTien();
    console.log("tongTienThanhToan: ", tongTienThanhToan);
  });
  document.getElementById("daThanhToan").innerHTML = `
  <h2 class="text-center text-2xl">Bạn đã thanh toán: ${tongTienThanhToan}</h2>
  <button onclick="exit()" class="btn mt-3 ">Thoát</button>`;
  GioHang = [];
  //tao json
  let dsspJson = JSON.stringify(GioHang);
  // lưu json vào localstorge
  localStorage.setItem(DSSP_LOCALSTORGE, dsspJson);
  renderGioHang(GioHang);
};
window.thanhToan = thanhToan;

let exit = () => {
  document.getElementById("daThanhToan").style.display = "none";
  document.getElementById("gio_hang").style.display = "block";
};
window.exit = exit;
