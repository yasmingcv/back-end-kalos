/************************************************************************************
 * 1 - Objetivo: Arquivo responsável por padronizar as mensagens de erro, mensagens de sucesso, funções, variáveis para  o projeto.
 * 2 - Data: 31/08/2023
 * 3 - Autor: Artur Alves
 * 4 - Versão: 1.0
 ************************************************************************************
 */

/********************* MENSAGENS DE ERRO ********************/
const ERROR_REQUIRED_FIELDS = {
  status: 400,
  message: "Campos obrigatórios não foram preenchidos.",
};

const ERROR_INVALID_ID = {
  status: 400,
  message: "O ID informado na requisição não é válido ou não foi encaminhado.",
};

const ERROR_INVALID_NAME = {
  status: 400,
  message:
    "O nome informado na requisição não é válido ou não foi encaminhado.",
};

const ERROR_EXISTING_REGISTER = {
  status: 409,
  message:
    "Já existe um registro com os dados informados.",
};

const ERROR_INVALID_EMAIL = {
  status: 400,
  message:
    "O email informado na requisição não é válido ou não foi encaminhado.",
};

const ERROR_ID_NOT_FOUND = {
  status: 404,
  message: "O ID informado é válido, mas não existe.",
};

const ERROR_NOT_FOUND = {
  status: 404,
  message: "Nenhum item encontrado na requisição.",
};

const ERROR_INTERNAL_SERVER = {
  status: 500,
  message:
    "Devido a um erro interno no servidor, não foi possível processar a requisição.",
};

const ERROR_INVALID_CONTENT_TYPE = {
  status: 415,
  message:
    "O tipo de mídia Content-type da solicitação não é compatível com o servidor. Tipo aceito:[application/json]",
};

const ERROR_INVALID_MATRICULA = {
  status: 400,
  message:
    "O número da matricula informado na requisição não é válido ou não foi encaminhado.",
};

const ERROR_INVALID_SIGLA = {
  status: 400,
  message:
    "A sigla informado na requisição não é válido ou não foi encaminhado.",
};

const ERROR_UNAUTHORIZED = {
  status: 401,
  message:
    "Não autorizado",
};

const ERROR_INVALID_TOKEN = {
  status: 401,
  message:
    "O token informado não é válido ou atingiu o tempo de expiração.",
};

/********************* MENSAGENS DE SUCESSO ********************/
const SUCCESS_CREATE_ITEM   = {status:201, message: 'Item criado com sucesso.'}

const SUCCESS_UPDATE_ITEM   = {status:200, message: 'Item atualizado com sucesso.'}

const SUCCESS_DELETE_ITEM   = {status:200, message: 'Item apagado com sucesso.'}

const SUCCESS_REQUEST       = {status:200, message: 'Requisição bem sucedida.'}








module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_ID,
    ERROR_INVALID_NAME,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_ID_NOT_FOUND,
    ERROR_NOT_FOUND,
    ERROR_INVALID_MATRICULA,
    ERROR_INVALID_SIGLA,
    SUCCESS_CREATE_ITEM,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETE_ITEM,
    SUCCESS_REQUEST,
    ERROR_UNAUTHORIZED,
    ERROR_INVALID_EMAIL,
    ERROR_EXISTING_REGISTER,
    ERROR_INVALID_TOKEN
}