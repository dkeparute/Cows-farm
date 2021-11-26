import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import List from "./Components/List";
import NewItem from "./Components/NewItem";
import Modal from './Components/Modal';
import Stats from './Components/Stats';
import Filter from './Components/Filter';
import Message from './Components/Message';

function App() {

  // Testui naudojamas hookas UseEffect, kuris turi 2 argumentus: wrapinta funkcija ir masyvas
  useEffect(() => {
    axios.get('http://localhost:3003/test')
      .then(res => {
        console.log(res.data);
      })
  }, [])
  // -------------------------------------------------------STARTAS--------------------
  const [list, setList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Read node (Reaktas kreipsis į serverį jog atspausdintų visus elementus iš DB)
  useEffect(() => {
    axios.get('http://localhost:3003/cow_farm')
      .then(res => {
        setList(res.data);
        console.log(res.data);
      })
  }, [lastUpdate])

  //DELETE NODE:
  const deleteItem = (id) => {
    setShowModal(false);
    axios.delete('http://localhost:3003/cow_farm/' + id)
      .then(res => {
        addMsg('Product was deleted!')
        setLastUpdate(Date.now())
        console.log(res.data);
      })
  }

  // CREATE NODE
  const create = item => {
    axios.post('http://localhost:3003/cow_farm', item)
      .then(res => {
        setLastUpdate(Date.now())
        // zinute
        addMsg('Product was added!')
        console.log(res.data);
      })
  }

  // MODAL

  // cia nurodoma kada modalas pasirodys ir kada ne
  const [showModal, setShowModal] = useState(false);

  const [modalElement, setModalElement] = useState({
    name: '',
    weight: '',
    total_milk: '',
    last_milking_time: '',
    day_milk: ''
  });

  // cia yra modalo valdymo funkcionalumas
  const modal = (item) => {
    setShowModal(true);
    setModalElement(item);
  }
  // funkcionalumas paspaudus mygtuka hide modalo langas dings
  const hide = () => {
    setShowModal(false);
  }
  // UPDATE NODE:
  const edit = (item, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/cow_farm/' + id, item)
      .then(res => {
        addMsg('Product was edited!')
        setLastUpdate(Date.now())
        console.log(res.data);
      })
  }
  // STATS
  const [stats, setStats] = useState({
    cowsCount: 0,
    milkCount: 0
  });

  useEffect(() => {
    axios.get('http://localhost:3003/stats')
      .then(res => {
        setStats(res.data[0]);
        console.log(res.data);
      })
  }, [lastUpdate])

  // SORT
  const simpleSort = by => {
    const itemCopy = list.slice();
    if ('total_milk' === by) {
      itemCopy.sort((a, b) => a.total_milk - b.total_milk)
      setList(itemCopy)
    }
    if ('weight' === by) {
      itemCopy.sort((a, b) => a.weight - b.weight)
      setList(itemCopy)
    }
  }
  // Message
  const [showMsg, setShowMsg] = useState(false);
  const msg = useRef('labas');

  const addMsg = text => {
    msg.current = text;
    setShowMsg(true);
    setTimeout(() => { clearMsg() }, 2000);
  }

  const clearMsg = () => {
    setShowMsg(false);
  }

  return (
    <div className="general">
      <h1> <span>Cows</span> farm</h1>
      <Message msg={msg.current} showMsg={showMsg} />
      <NewItem create={create} />
      <Filter simpleSort={simpleSort} />
      <Stats stats={stats} />
      <Modal showModal={showModal} hide={hide} modalElement={modalElement} edit={edit} deleteItem={deleteItem} />
      <List list={list} deleteItem={deleteItem} modal={modal} />
    </div>
  );
}
export default App;