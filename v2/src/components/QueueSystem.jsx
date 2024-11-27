import { useState, useEffect } from "react"; // Removido o React import
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap para estilização

const QueueSystem = () => {
  // Estado para gerenciar a fila de pacientes
  const [normalQueue, setNormalQueue] = useState([]); // Fila normal
  const [priorityQueue, setPriorityQueue] = useState([]); // Fila prioritária
  const [log, setLog] = useState([]); // Histórico de eventos para o log
  const [counter, setCounter] = useState(1); // Contador para gerar as senhas em ordem crescente

  // Função para adicionar um paciente à fila
  const addPatient = (isPriority = false) => {
    const newPatient = {
      id: counter, // Atribuindo o contador à id do paciente
      priority: isPriority,
      number: counter, // Senha gerada em ordem crescente
    };

    // Incrementa o contador para o próximo paciente
    setCounter(prevCounter => prevCounter + 1);

    if (isPriority) {
      setPriorityQueue((prevQueue) => [...prevQueue, newPatient]); // Adiciona à fila prioritária
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${newPatient.number} entrou na fila prioritária.`
      ]);
    } else {
      setNormalQueue((prevQueue) => [...prevQueue, newPatient]); // Adiciona à fila normal
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${newPatient.number} entrou na fila normal.`
      ]);
    }
  };

  // Função para chamar o próximo paciente e removê-lo da fila
  const callNextPatient = () => {
    let nextPatient;

    // Verifica se há pacientes na fila prioritária
    if (priorityQueue.length > 0) {
      nextPatient = priorityQueue[0]; // O primeiro paciente da fila prioritária
      setPriorityQueue(priorityQueue.slice(1)); // Remove o paciente da fila prioritária
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${nextPatient.number} foi chamado da fila prioritária e atendido.`
      ]);
    } else if (normalQueue.length > 0) {
      nextPatient = normalQueue[0]; // O primeiro paciente da fila normal
      setNormalQueue(normalQueue.slice(1)); // Remove o paciente da fila normal
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${nextPatient.number} foi chamado da fila normal e atendido.`
      ]);
    } else {
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Não há pacientes na fila para serem chamados.`
      ]);
    }
  };

  // Função para adicionar 10 pacientes com prioridade ou normal
  const addMultiplePatients = () => {
    const newNormalQueue = [];
    const newPriorityQueue = [];
    const newLog = [];

    for (let i = 0; i < 10; i++) {
      const isPriority = Math.random() > 0.5; // Randomiza se será prioridade ou normal
      const patient = {
        id: counter + i, // Atribui a senha crescente
        priority: isPriority,
        number: counter + i, // Senha gerada em ordem crescente
      };

      if (isPriority) {
        newPriorityQueue.push(patient);
        newLog.push(`${new Date().toLocaleTimeString()} - Paciente ${patient.number} entrou na fila prioritária.`);
      } else {
        newNormalQueue.push(patient);
        newLog.push(`${new Date().toLocaleTimeString()} - Paciente ${patient.number} entrou na fila normal.`);
      }
    }

    setNormalQueue(prevQueue => [...prevQueue, ...newNormalQueue]);
    setPriorityQueue(prevQueue => [...prevQueue, ...newPriorityQueue]);
    setLog(prevLog => [...prevLog, ...newLog]);
    setCounter(counter + 10); // Atualiza o contador para o próximo paciente
  };

  // Automatizando a saída dos pacientes
  useEffect(() => {
    const interval = setInterval(() => {
      callNextPatient(); // Chama o próximo paciente a cada 5 segundos (5000ms)
    }, 5000); // Intervalo de 5 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [priorityQueue, normalQueue]); // Dependências para atualizar o intervalo quando as filas mudam

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Sistema de Senhas - Consultório Odontológico</h1>

      {/* Botões para adicionar pacientes */}
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={() => addPatient(false)}>
          Adicionar Paciente Normal
        </button>
        <button className="btn btn-danger ml-2" onClick={() => addPatient(true)}>
          Adicionar Paciente Prioritário
        </button>
        <button className="btn btn-success ml-2" onClick={addMultiplePatients}>
          Adicionar 10 Pacientes Aleatórios
        </button>
      </div>

      {/* Exibindo a fila normal */}
      <div>
        <h3>Fila Normal</h3>
        <ul>
          {normalQueue.map((patient) => (
            <li key={patient.id}>Paciente {patient.number}</li>
          ))}
        </ul>
      </div>

      {/* Exibindo a fila prioritária */}
      <div>
        <h3>Fila Prioritária</h3>
        <ul>
          {priorityQueue.map((patient) => (
            <li key={patient.id}>Paciente {patient.number}</li>
          ))}
        </ul>
      </div>

      {/* Exibindo o log de eventos */}
      <div>
        <h3>Log de Eventos</h3>
        <ul>
          {log.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueueSystem;
import { useState, useEffect } from "react"; // Removido o React import
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap para estilização

const QueueSystem = () => {
  // Estado para gerenciar a fila de pacientes
  const [normalQueue, setNormalQueue] = useState([]); // Fila normal
  const [priorityQueue, setPriorityQueue] = useState([]); // Fila prioritária
  const [log, setLog] = useState([]); // Histórico de eventos para o log
  const [counter, setCounter] = useState(1); // Contador para gerar as senhas em ordem crescente

  // Função para adicionar um paciente à fila
  const addPatient = (isPriority = false) => {
    const newPatient = {
      id: counter, // Atribuindo o contador à id do paciente
      priority: isPriority,
      number: counter, // Senha gerada em ordem crescente
    };

    // Incrementa o contador para o próximo paciente
    setCounter(prevCounter => prevCounter + 1);

    if (isPriority) {
      setPriorityQueue((prevQueue) => [...prevQueue, newPatient]); // Adiciona à fila prioritária
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${newPatient.number} entrou na fila prioritária.`
      ]);
    } else {
      setNormalQueue((prevQueue) => [...prevQueue, newPatient]); // Adiciona à fila normal
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${newPatient.number} entrou na fila normal.`
      ]);
    }
  };

  // Função para chamar o próximo paciente e removê-lo da fila
  const callNextPatient = () => {
    let nextPatient;

    // Verifica se há pacientes na fila prioritária
    if (priorityQueue.length > 0) {
      nextPatient = priorityQueue[0]; // O primeiro paciente da fila prioritária
      setPriorityQueue(priorityQueue.slice(1)); // Remove o paciente da fila prioritária
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${nextPatient.number} foi chamado da fila prioritária e atendido.`
      ]);
    } else if (normalQueue.length > 0) {
      nextPatient = normalQueue[0]; // O primeiro paciente da fila normal
      setNormalQueue(normalQueue.slice(1)); // Remove o paciente da fila normal
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Paciente ${nextPatient.number} foi chamado da fila normal e atendido.`
      ]);
    } else {
      setLog((prevLog) => [
        ...prevLog, 
        `${new Date().toLocaleTimeString()} - Não há pacientes na fila para serem chamados.`
      ]);
    }
  };

  // Função para adicionar 10 pacientes com prioridade ou normal
  const addMultiplePatients = () => {
    const newNormalQueue = [];
    const newPriorityQueue = [];
    const newLog = [];

    for (let i = 0; i < 10; i++) {
      const isPriority = Math.random() > 0.5; // Randomiza se será prioridade ou normal
      const patient = {
        id: counter + i, // Atribui a senha crescente
        priority: isPriority,
        number: counter + i, // Senha gerada em ordem crescente
      };

      if (isPriority) {
        newPriorityQueue.push(patient);
        newLog.push(`${new Date().toLocaleTimeString()} - Paciente ${patient.number} entrou na fila prioritária.`);
      } else {
        newNormalQueue.push(patient);
        newLog.push(`${new Date().toLocaleTimeString()} - Paciente ${patient.number} entrou na fila normal.`);
      }
    }

    setNormalQueue(prevQueue => [...prevQueue, ...newNormalQueue]);
    setPriorityQueue(prevQueue => [...prevQueue, ...newPriorityQueue]);
    setLog(prevLog => [...prevLog, ...newLog]);
    setCounter(counter + 10); // Atualiza o contador para o próximo paciente
  };

  // Automatizando a saída dos pacientes
  useEffect(() => {
    const interval = setInterval(() => {
      callNextPatient(); // Chama o próximo paciente a cada 5 segundos (5000ms)
    }, 5000); // Intervalo de 5 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [priorityQueue, normalQueue]); // Dependências para atualizar o intervalo quando as filas mudam

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Sistema de Senhas - Consultório Odontológico</h1>

      {/* Botões para adicionar pacientes */}
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={() => addPatient(false)}>
          Adicionar Paciente Normal
        </button>
        <button className="btn btn-danger ml-2" onClick={() => addPatient(true)}>
          Adicionar Paciente Prioritário
        </button>
        <button className="btn btn-success ml-2" onClick={addMultiplePatients}>
          Adicionar 10 Pacientes Aleatórios
        </button>
      </div>

      {/* Exibindo a fila normal */}
      <div>
        <h3>Fila Normal</h3>
        <ul>
          {normalQueue.map((patient) => (
            <li key={patient.id}>Paciente {patient.number}</li>
          ))}
        </ul>
      </div>

      {/* Exibindo a fila prioritária */}
      <div>
        <h3>Fila Prioritária</h3>
        <ul>
          {priorityQueue.map((patient) => (
            <li key={patient.id}>Paciente {patient.number}</li>
          ))}
        </ul>
      </div>

      {/* Exibindo o log de eventos */}
      <div>
        <h3>Log de Eventos</h3>
        <ul>
          {log.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueueSystem;
