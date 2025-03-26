class Tarefa {
    constructor(titulo, prioridade) {
        this.titulo = titulo;
        this.prioridade = prioridade;
        this.concluida = false;
    }

    concluir() {
        this.concluida = true;
    }
}

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
 
class IteradorTarefas {
    constructor(tarefas) {
        this.tarefas = tarefas;
        this.index = 0;
    }

    temProximo() {
        return this.index < this.tarefas.length;
    }

    proximo() {
        return this.tarefas[this.index++];
    }
}

class ComandoCriarTarefa {
    constructor(listaTarefas, tarefa) {
        this.listaTarefas = listaTarefas;
        this.tarefa = tarefa;
    }

    executar() {
        this.listaTarefas.adicionarTarefa(this.tarefa);
    }

    desfazer() {
        const index = this.listaTarefas.tarefas.indexOf(this.tarefa);
        if (index !== -1) {
            this.listaTarefas.tarefas.splice(index, 1);
        }
    }
}

class ComandoConcluirTarefa {
    constructor(tarefa) {
        this.tarefa = tarefa;
        this.estadoAnterior = tarefa.concluida;
    }

    executar() {
        this.tarefa.concluir();
    }

    desfazer() {
        this.tarefa.concluida = this.estadoAnterior;
    }
}

class FiltroPrioridade {
    constructor(prioridade) {
        this.prioridade = prioridade;
    }

    aplicar(tarefas) {
        return tarefas.filter(tarefa => tarefa.prioridade === this.prioridade);
    }
}

class ObservadorTarefaConcluida {
    constructor() {
        this.observadores = [];
    }

    adicionarObservador(observador) {
        this.observadores.push(observador);
    }

    notificar() {
        this.observadores.forEach(obs => obs.atualizar());
    }
}
class HistoricoComandos {
    constructor() {
        this.comandos = [];
    }

    adicionarComando(comando) {
        this.comandos.push(comando);
    }

    desfazer() {
        const comando = this.comandos.pop();
        if (comando) comando.desfazer();
    }
}

// Criando tarefas
const tarefa1 = new Tarefa('Estudar', 'alta');
const tarefa2 = new Tarefa('Comprar comida', 'baixa');
const tarefa3 = new Tarefa('fazer compras','alta');

// Lista de tarefas
const listaTarefas = new ListaTarefas();
const historico = new HistoricoComandos();

// Comando para criar tarefas
const comandoCriarTarefa1 = new ComandoCriarTarefa(listaTarefas, tarefa1);
const comandoCriarTarefa2 = new ComandoCriarTarefa(listaTarefas, tarefa2);
const comandoCriarTarefa3 = new ComandoCriarTarefa(listaTarefas,tarefa3);
// Executando comandos
comandoCriarTarefa1.executar();
comandoCriarTarefa2.executar();
comandoCriarTarefa3.executar();

// Filtro por prioridade
const filtroAlta = new FiltroPrioridade('alta');
const tarefasAlta = filtroAlta.aplicar(listaTarefas.tarefas);
console.log('Tarefas de alta prioridade:', tarefasAlta);

// Concluir tarefa
const comandoConcluirTarefa1 = new ComandoConcluirTarefa(tarefa1);
const comandoConcluirTarefa2 = new ComandoConcluirTarefa(tarefa2);
const comandoConcluirTarefa3 = new ComandoConcluirTarefa(tarefa3);
comandoConcluirTarefa1.executar();
comandoConcluirTarefa2.executar();
comandoConcluirTarefa3.executar();


// Observador de conclusão de tarefa
const observador = new ObservadorTarefaConcluida();
observador.adicionarObservador({
    atualizar() {
        console.log('Tarefa concluída: ', tarefa1.titulo);
        console.log('Tarefa concluída: ', tarefa2.titulo);
        console.log('Tarefa concluída: ', tarefa3.titulo);
    }
});
observador.notificar(); // Notifica que a tarefa foi concluída

// Histórico de comandos
historico.adicionarComando(comandoCriarTarefa1);
historico.adicionarComando(comandoCriarTarefa2);
historico.adicionarComando(comandoConcluirTarefa1);

// Desfazer último comando
historico.desfazer();

