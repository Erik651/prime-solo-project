import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import FertilizeForm from '../FertilizeForm/FertilizeForm';
import PruneForm from '../PruneForm/PruneForm';
import DecandleForm from '../DecandleForm/DecandleForm';
import WireForm from '../WireForm/WireForm';
import RepotForm from '../RepotForm/RepotForm';
import './MyTreesItem.css';

function MyTreesItem() {
  const dispatch = useDispatch();
  const treeToDisplay = useSelector((store) => store.selectedTree);
  const datesToDisplay = useSelector((store) => store.tree_activity);
  const imagesToDisplay = useSelector((store) => store.images) || [];
  const [fertilizeDate, setFertilizeDate] = useState('');
  const [pruneDate, setPruneDate] = useState('');
  const [decandleDate, setDecandleDate] = useState('');
  const [repotDate, setRepotDate] = useState('');
  const [wireDate, setWireDate] = useState('');
  const history = useHistory();
  const { id: treeId } = useParams();
  console.log('imagesToDisplay.tree_id', imagesToDisplay.tree_id);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log('in MyTreesItem useEffect');
    dispatch({ type: 'FETCH_SELECTED_TREE', payload: treeId });
    dispatch({ type: 'FETCH_TREE_ACTIVITY_DATES', payload: treeId });
    dispatch({ type: 'FETCH_IMAGES_BY_ID', payload: treeId });
    console.log('treeId from dispatch', treeId);
  }, [dispatch, treeId]);

  const submitForm = (event, activityId, date) => {
    event.preventDefault();
    const payload = { date_text: date, treeId, activity_id: activityId };
    dispatch({
      type: 'UPDATE_ACTIVITY_DATE',
      payload,
      history,
    });
    console.log('submitForm UPDATE_ACTIVITY_DATE payload', payload);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tree?');
    if (confirmDelete) {
      dispatch({ type: 'DELETE_TREE', payload: treeId, history });
    }
  };

  console.log('datesToDisplay', datesToDisplay);
  if (!treeToDisplay) {
    return <div>Loading...</div>;
  }

  const normalizedTreeId = parseInt(treeId, 10);
  console.log('treeId:', treeId, typeof treeId);
  console.log('normalizedTreeId:', normalizedTreeId, typeof normalizedTreeId);

  const filteredDates = datesToDisplay.filter((date) => {
    const isMatch = date.tree_id === normalizedTreeId;
    console.log('date.tree_id:', date.tree_id, typeof date.tree_id, 'isMatch:', isMatch);
    return isMatch;
  });

  console.log('filteredDates', filteredDates);

  const renderLastActionDates = () => {
    const activityTypes = {
      1: 'Fertilize',
      2: 'Prune',
      3: 'Decandle',
      4: 'Repot',
      5: 'Wire',
    };

    return filteredDates.map((date) => (
      <div key={date.activity_id}>
        <p>Last {activityTypes[date.activity_id]} Date: {formatDate(date.date_text)}</p>
      </div>
    ));
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div>
      <h1>{treeId}</h1>
      <div>
        <section className="myTreesItem">
          <h1>Name: {treeToDisplay.name}</h1>
          <h3>Date of birth: {formatDate(treeToDisplay.dob)}</h3>
          <h3>{renderLastActionDates()}</h3>
          <h3>Notes: {treeToDisplay.notes}</h3>
          <h3>Images:</h3>
          <div>
            {imagesToDisplay.map((image) => {
              console.log('image.image_data', image.image_data);
              return (
                <img
                  key={image.id}
                  src={`data:${image.mimetype};base64,${arrayBufferToBase64(image.image_data.data)}`}
                  alt={image.filename}
                  style={{ maxWidth: '200px', margin: '10px' }}
                />
              );
            })}
          </div>
          <Link to={`/editTree/${treeToDisplay.id}`}>Edit</Link>
          <br />
          <br />
          <button onClick={handleDelete}>Delete</button>
          <br />
          <br />
          {treeToDisplay.status_id === 1 && (
            <>
              <FertilizeForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 1)}
                fertilizeDate={fertilizeDate}
                setFertilizeDate={setFertilizeDate}
                submitForm={submitForm}
              />
              <PruneForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 2)}
                pruneDate={pruneDate}
                setPruneDate={setPruneDate}
                submitForm={submitForm}
              />
              <DecandleForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 3)}
                decandleDate={decandleDate}
                setDecandleDate={setDecandleDate}
                submitForm={submitForm}
              />
              <WireForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 5)}
                wireDate={wireDate}
                setWireDate={setWireDate}
                submitForm={submitForm}
              />
              <RepotForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 4)}
                repotDate={repotDate}
                setRepotDate={setRepotDate}
                submitForm={submitForm}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default MyTreesItem;