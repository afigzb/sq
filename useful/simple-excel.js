document.getElementById("importButton").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("请先上传文件！");
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        const data = e.target.result;

        // 使用 SimpleExcel 解析文件内容
        const excel = new SimpleExcel("import");
        excel.load(data);

        // 将解析的数据展示到表格
        const table = document.getElementById("dataTable");
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // 清空之前的数据

        excel.sheet.data.forEach((row) => {
            const tr = document.createElement("tr");
            row.forEach((cell) => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        alert("Excel 数据已成功导入！");
    };

    reader.readAsBinaryString(file);
});

// 导出表格数据为 Excel 文件
document.getElementById("exportButton").addEventListener("click", () => {
    const data = [
        ["姓名", "年龄", "城市"],
        ["Alice", 25, "New York"],
        ["Bob", 30, "Los Angeles"]
    ];

    // 使用 SimpleExcel 生成 Excel 文件
    const excel = new SimpleExcel("export");
    excel.set(data);
    excel.generate("导出文件.xlsx");
    alert("文件已导出！");
});
