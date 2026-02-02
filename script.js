const originalFiles = [
  "IMG_1234.JPG",
  "IMG_1235.JPG",
  "DSC_0001.JPG",
  "IMG_9999.JPG"
];

let selectedFiles = [...originalFiles];

const fileArea = document.getElementById("fileArea");
const resultList = document.getElementById("resultList");

function renderFiles() {
  fileArea.innerHTML = "";
  selectedFiles.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.className = "file-btn active";
    fileArea.appendChild(btn);
  });
}

function runRename() {
  const cmd = document.getElementById("command").value.trim();
  const match = cmd.match(/^s\/(.+)\/(.+)\/$/);

  if (!match) {
    alert("Use format: s/OLD/NEW/");
    return;
  }

  const from = new RegExp(match[1], "g");
  const to = match[2];

  const result = selectedFiles.map(f => f.replace(from, to));

  resultList.innerHTML = "";
  result.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    resultList.appendChild(li);
  });
}

function resetLab() {
  selectedFiles = [...originalFiles];
  resultList.innerHTML = "";
  renderFiles();
}

// 初期表示
renderFiles();
