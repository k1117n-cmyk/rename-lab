// ================================
// Rename Lab @ UNIX Cafe
// script.js（正式仕様）
// ================================

// 元データ（実ファイルは触らない）
const originalFiles = [
  "IMG_1234.JPG",
  "IMG_1235.JPG",
  "DSC_0001.JPG",
  "IMG_9999.JPG"
];

// 現在選択中のファイル（1つ）
let currentFile = null;

// DOM取得
const fileArea = document.getElementById("fileArea");
const commandInput = document.getElementById("command");
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

    if (name === currentFile) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      currentFile = name;
      updateTerminal();
      renderFiles();
    };

    fileArea.appendChild(btn);
  });
}

// -------------------------------
// ターミナル表示を更新
// -------------------------------
function updateTerminal() {
  if (!currentFile) {
    commandInput.value = "";
    return;
  }

  // rename 対象ファイルをターミナルに反映
  commandInput.value = "s/IMG_/trip_/";
}

// -------------------------------
// rename 実行
// -------------------------------
function runRename() {
  if (!currentFile) {
    alert("Select a file first.");
    return;
  }

  const cmd = commandInput.value.trim();
  const match = cmd.match(/^s\/(.+)\/(.+)\/$/);

  if (!match) {
    alert("Use format: s/OLD/NEW/");
    return;
  }

  const from = new RegExp(match[1], "g");
  const to = match[2];

  const renamed = currentFile.replace(from, to);

  resultList.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = renamed;
  resultList.appendChild(li);
}

// -------------------------------
// Reset（初期状態に戻す）
// -------------------------------
function resetLab() {
  currentFile = null;
  commandInput.value = "";
  resultList.innerHTML = "";
  renderFiles();
}

// -------------------------------
// 初期表示
// -------------------------------
renderFiles();
