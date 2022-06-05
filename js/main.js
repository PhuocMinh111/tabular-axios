function getEle(id) {
  return document.getElementById(id);
}
var validation = new Validation();
var _data;
var s = new Service();
function getTeacher() {
  s.getTeacherApi().then((res) => {
    var data = res.data;
    renderList(data);
    _data = data;
  });
}

getTeacher();

function renderList(data) {
  var content = "";
  data.forEach((person) => {
    var { taiKhoan, email, loaiND, ngonNgu, moTa, hinhAnh } = person;
    content += `<div class="col-lg-3 col-md-6 p-3">
        <div class="card">
          <img src="./img/${hinhAnh}" alt="" srcset="">
          <div class="form-group mt-2 text-center">
            <h4 class="country">${ngonNgu}</h4>
            <h4 class="author-name">${taiKhoan}</h4>
            <p>${moTa}</p>
          </div>
        </div>
      </div>`;
  });
  getEle("our-teach").innerHTML = content;
}
// them btn
var btn = `
<a id="btnThem" class="btn btn-success text-light ml-auto">Thêm</a>
`;
var div = document.createElement("div");
div.classList.add("form-group");
div.innerHTML = btn;
document.querySelector(".modal-body").appendChild(div);

function getTable() {
  s.getTeacherApi().then((res) => {
    var data = res.data;
    renderTable(data);
  });
}

function renderTable(data) {
  var content = "";
  data.forEach((person) => {
    var {
      id,
      taiKhoan,
      email,
      matKhau,
      hoTen,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh,
    } = person;
    content += `<tr>
        <td>${id}</td>
        <td>${taiKhoan}</td>
        <td>${matKhau}</td>
        <td>${hoTen}</td>
        <td>${email}</td>
        <td>${ngonNgu}</td>
        <td></td>
        <td>
        <button class="btn btn-primary ml-2"
        data-toggle="modal"
        onclick="sua(${id})
        data-target="#myModal">
        sửa
        </button>
        <button class="btn btn-danger ml-2"
        onclick="xoa(${id})">
        xoá
        </button>
        </td>
      </tr>`;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}
getEle("tblDanhSachNguoiDung").inner;

function layThongTin() {
  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var hinhAnh = document.getElementById("HinhAnh").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var moTa = document.getElementById("MoTa").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;

  var isValid = true;

  //MaSV
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "error-taikhoan",
      "(*) Vui long nhap tai khoan"
    ) &&
    validation.kiemTraDoDaiKiTu(
      taiKhoan,
      "error-taikhoan",
      4,
      8,
      "(*) Vui long nhap ki tu 4 - 8"
    );
  // ) &&
  // validation.kiemTraMaSVTonTai(
  //   taiKhoan,
  //   "errorMaSV",
  //   "(*) Ma SV da ton tai",
  //   _data
  // );

  //TenSV
  isValid &=
    validation.kiemTraRong(hoTen, "error-hoten", "(*) Vui long nhap ho ten") &&
    validation.kiemChuoiKiTu(
      hoTen,
      "error-hoten",
      "(*) Vui long nhap chuoi ki tu"
    );

  //Email
  isValid &= validation.kiemTraRong(
    email,
    "error-email",
    "(*) Vui long nhap Email"
  );

  //Pass
  isValid &= validation.kiemTraRong(
    matKhau,
    "error-matkhau",
    "(*) Vui long nhap mat khau"
  );

  //ngay sinh

  //KhoaHoc
  isValid &= validation.kiemTraSelect(
    "loaiNgonNgu",
    "error-loaingonngu",
    "(*) Vui long chon ngon ngu"
  );
  isValid &= validation.kiemTraSelect(
    "loaiNguoiDung",
    "error-loainguoidung",
    "(*) Vui long chon nguoi dung"
  );

  //toan
  isValid &=
    validation.kiemTraRong(moTa, "error-mota", "(*) Vui long nhap mo ta") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "error-mota",
      60,
      2000,
      "(*) Vui long nhap 60 ki tu"
    );

  //ly

  if (!isValid) return;

  var newND = {
    taiKhoan: taiKhoan,
    hoTen: hoTen,
    matKhau: matKhau,
    email: email,
    hinhAnh: hinhAnh,
    loaiND: loaiND,
    moTa: moTa,
    ngonNgu: ngonNgu,
  };
  s.addApi(newND);
}

getEle("btnThem").onclick = function () {
  layThongTin();
};
function xoa(id) {
  s.delTeaacherApi(id).then((res) => {
    console.log("success");
  });
  s.getTeacherApi();
  then((res) => {
    renderTable(res.data);
  });
}

function sua(id) {}

var forms = document.querySelectorAll(".modal-body .form-group");
forms.forEach((ele) => {
  var input = ele.children[1];
  var err = document.createElement("small");
  err.innerHTML = "(*)";
  err.style.display = "none";
  err.classList.add("text-danger");
  err.id = `error-${input.id.toLowerCase()}`;
  ele.appendChild(err);
});
console.log(forms);
