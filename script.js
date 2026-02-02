// ================================
// Rename Lab @ UNIX Cafe
// script.js
// ================================

// 元データ（実ファイルは触らない）
const originalFiles = [
  "IMG_1234.JPG",
  "IMG_1235.JPG",
  "DSC_0001.JPG",
  "IMG_9999.JPG"
];

// 選択状態（初期状態は全選択）
let selectedFiles = new Set(originalFiles);

// DOM 取得
const fileArea = document.getElementById("fileArea");
const resultList = document.getElementById("resultList");

// -------------------------------
// ファイル一覧を描画（ボタン）
// -------------------------------
function renderFiles() {
  fileArea.innerHTML = "";

  originalFiles.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.className = "file-btn";

    // 選択中なら active
    if (selectedFiles.has(name)) {
      btn.classList.add("active");
    }

    // クリックで ON / OFF 切り替え
    btn.onclick = () => {
      if (selectedFiles.has(name)) {
        selectedFiles.delete(name);
        btn.classList.remove("active");
      } else {
        selectedFiles.add(name);
        btn.classList.add("active");
      }
    };

    fileArea.appendChild(btn);
  });
}

// -------------------------------
// rename 実行
// -------------------------------
function runRename() {
  const cmd = document.getElementById("command").value.trim();
  const match = cmd.match(/^s\/(.+)\/(.+)\/$/);

  if (!match) {
    alert("Use format: s/OLD/NEW/");
    return;
  }

  const from = new RegExp(match[1], "g");
  const to = match[2];

  resultList.innerHTML = "";

  originalFiles.forEach(name => {
    // 選択されているものだけ rename
    const resultName = selectedFiles.has(name)
      ? name.replace(from, to)
      : name;

    const li = document.createElement("li");
    li.textContent = resultName;
    resultList.appendChild(li);
  });
}

// -------------------------------
// Reset（全選択に戻す）
// -------------------------------
function resetLab() {
  selectedFiles = new Set(originalFiles);
  resultList.innerHTML = "";
  renderFiles();
}

// -------------------------------
// 初期表示
// -------------------------------
renderFiles();
