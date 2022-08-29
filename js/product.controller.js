export let renderDSSP = (arr) => {
  // console.log("arr: ", arr);
  var contentListSP = "";

  arr.forEach((item) => {
    // console.log("item id", item.id);
    let str = ` <div class="itemSP my-4">
      <div class="imgContainer">
        <img src="${item.img}"/>
      </div>
      <div class="item_detail">
        <div class="item_name">
          ${item.name}
        </div>
        <div class="item_warpper">
          <P><span>Price: ${item.price}</span></p>
          <p>Front Camere: ${item.frontCamera}</p>
          <p>Back Camera: ${item.backCamera}</p>
          <p>Screen: ${item.screen}</p>
          <p>${item.desc}</p>
        </div>
        <div class="item_addCart pt-2">
          <button class="add_Cart bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onclick="addToCart('${item.id}')">Add To Cart</button>
        </div>
      </div>
    </div>`;
    contentListSP += str;
  });
  // console.log("contentListSP: ", contentListSP);
  document.getElementById("listSP").innerHTML = contentListSP;
};

export let renderGioHang = (arr) => {
  console.log("arr: ", arr);
  if (arr == "")
    document.getElementById(
      "table_gio_hang"
    ).innerHTML = `<h2>Chưa có sản phẩm trong giỏ hàng</h2>`;
  else {
    let strTr = `
    <table class="table-auto">
    <thead>
    <th>Hình ảnh</th>
    <th>Tên sản phẩm</th>
    <th>Giá</th>
    <th>Số lượng</th>
    <th>Tổng tiền</th>
    <th>Xóa</th>
    </thead><tbody>`;
    arr.forEach((item) => {
      // console.log("item id", item);
      let strTd = `<tr class="my-3 text-center">
      <td><img src=${item.img} class="w-20 h-auto rounded-lg mx-auto"></td>
      <td><p>${item.name}</p></td>
      <td><p>${item.price}</p></td>
      <td>
      <div class="justify-evenly">
        <button onclick="tangGiamSoLuong('${
          item.id
        }','giam')"><i class="fa fa-minus"></i></button>
        <p>${item.soLuong}</p>
        <button onclick="tangGiamSoLuong('${
          item.id
        }','tang')"><i class="fa fa-plus"></i></button>
        </div>
      </td>
      <td><p>${item.tongTien()}</p></td>
      <td><button onclick="removeCart('${
        item.id
      }')"><i class="fa fa-trash"></i></button></td>
      </tr>`;
      strTr += strTd;
    });
    strTr += "<t/body></table>";
    document.getElementById("table_gio_hang").innerHTML = strTr;
  }

  let tongTienThanhToan = 0;

  arr.forEach((item) => {
    tongTienThanhToan += item.tongTien();
  });

  document.getElementById(
    "final"
  ).innerHTML = ` <strong>Total: <span class="total">${tongTienThanhToan}$</span></strong>
  <div class="action">
    <button onclick="thanhToan()" class="btn buy">
      Thanh toán
      <i class="fas fa-credit-card" style="color: #6665dd"></i>
    </button>
    <button onclick="clearCart()" class="btn clear">
      Clear Cart <i class="fas fa-trash" style="color: #bb342f"></i>
    </button>
  </div>`;
};
