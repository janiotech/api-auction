document
  .getElementById('upload-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0]; // Pega o primeiro arquivo selecionado
    console.log(file);
    if (!file) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // 'file' deve ser o mesmo nome do campo usado no NestJS

    try {
      const response = await fetch('http://localhost:3000/auction-items', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response;
        console.log(data);
        // document.getElementById('message').textContent =
        //   `Imagem enviada com sucesso! Caminho: ${data.filePath}`;
      } else {
        // document.getElementById('message').textContent =
        //   'Erro ao enviar a imagem.';
      }
    } catch (error) {
      console.error('Erro:', error);
      document.getElementById('message').textContent =
        'Erro ao enviar a imagem.';
    }
  });
