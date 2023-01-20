const validation = {
  pix_key_type: {
    required: true,
    allowedTypes: ['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA']
  },
  pix_key: {
    maxLength: 140,
    required: true,
    when: {
      pix_key_type: {
        CPF: {
          pattern: /^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$/
        },
        CNPJ: {
          pattern: /^[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2}$/
        },
        EMAIL: {
          pattern: /^[A-Z0-9+.-]+@[A-Z0-9.-]+$/
        },
        TELEFONE: {
          //pattern: /^((?:+?55)?)([1-9][0-9])(9[0-9]{8})$/ <- padrão apresentou problemas
          pattern: /^55\d{11}$/ 
        },
        CHAVE_ALEATORIA: {
          pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        }
      }
    }
  },
  email: {
    maxLength: 250,
    required: false,
    pattern: /^[A-Z0-9+.-]+@[A-Z0-9.-]+$/
  }
}

module.exports = validation;