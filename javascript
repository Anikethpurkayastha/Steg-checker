function uploadImage() {
    const fileInput = document.getElementById('imageInput');
    const result = document.getElementById('result');
    const loader = document.getElementById('loader');

    result.textContent = '';
    loader.classList.remove('hidden');

    const file = fileInput.files[0];
    if (!file) {
        loader.classList.add('hidden');
        result.textContent = "Please select a file!";
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetch('/detect', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        loader.classList.add('hidden');
        result.innerHTML = data.hidden_data
            ? "<span style='color:#00ff9c;'>Hidden data detected!</span>"
            : "<span style='color:#ff5555;'>No hidden data found.</span>";
    })
    .catch(err => {
        loader.classList.add('hidden');
        result.textContent = "Error: " + err.message;
    });
}
