class ListaTarefas {
    constructor() {
        this.tarefas = [];
    }

    adicionarTarefa(tarefa) {
        this.tarefas.push(tarefa);
    }

    obterIterator() {
        return new IteradorTarefas(this.tarefas);
    }

    filtrarPorPrioridade(prioridade) {
        return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade);
    }
}