export function campoObrigatorio(value) {
    return { required: true, value };
}

export function campoOpcional(value) {
    return { required: false, value };
}

