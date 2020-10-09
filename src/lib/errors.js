module.exports = {
	NOT_FOUND: (resouceName) => ({ code: 404, message: `recurso (${resouceName}) não encontrado` }),
	BAD_REQUEST: (messageText) => ({ code: 400, message: messageText || 'requisição inválida' }),
	UNAUTHORIZED: () => ({ code: 401, message: 'não autorizado' }),
	CONFLICT: (conflictDescription) => ({ code: 409, message: `conflito, ${conflictDescription}` }),
	INTERNAL_SERVER_ERROR: 'erro interno no servidor',
};
