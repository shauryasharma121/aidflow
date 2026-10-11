import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { NeedType } from '../../types';
import {
  Phone,
  Plus,
  Minus,
  MapPin,
  HeartPulse,
  Waves,
  Home,
  Droplets,
  Mountain,
  MoreHorizontal,
  ChevronRight,
} from 'lucide-react';
import '../../styles/common.css';
import '../../styles/CitizenFlow.css';

/**
 * RequestHelpPage
 * 
 * Step 1 of Citizen Aid Request flow.
 * Designed for quick mobile emergency submission with high contrast controls.
 */
export const RequestHelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { createRequest } = useAidFlow();

  const [selectedNeed, setSelectedNeed] = useState<NeedType>('Medical');
  const [peopleCount, setPeopleCount] = useState<number>(3);
  const [phoneNumber, setPhoneNumber] = useState<string>('(317) 555-0148');
  const [address, setAddress] = useState<string>('214 S 9th St, Noblesville');
  const [town, setTown] = useState<string>('Noblesville');
  const [description, setDescription] = useState<string>(
    "Water came in fast overnight. My father (78) has chest pain and can't walk out through the flooded street. 214 S 9th St, Noblesville."
  );

  const needsList: { id: NeedType; label: string; icon: React.ReactNode }[] = [
    { id: 'Medical', label: 'Medical', icon: <HeartPulse size={22} /> },
    { id: 'Water Rescue', label: 'Water Rescue', icon: <Waves size={22} /> },
    { id: 'Shelter', label: 'Shelter', icon: <Home size={22} /> },
    { id: 'Food and Water', label: 'Food and Water', icon: <Droplets size={22} /> },
    { id: 'Debris', label: 'Debris', icon: <Mountain size={22} /> },
    { id: 'Other', label: 'Other', icon: <MoreHorizontal size={22} /> },
  ];

  // Geocoding simulation from browser/device GPS
  const handleUseLocation = () => {
    // TODO: integrate navigator.geolocation.getCurrentPosition() with county GIS reverse geocoding
    setAddress('214 S 9th St, Noblesville, IN 46060');
    setTown('Noblesville');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newId = createRequest({
      needType: selectedNeed,
      peopleCount,
      address,
      town: town || 'Noblesville',
      phone: phoneNumber,
      description,
      hasPhoto: true,
    });

    // Proceed to Step 2 photo attachment
    navigate('/request/photos', { state: { requestId: newId } });
  };

  return (
    <div className="citizen-phone-wrapper">
      {/* Header */}
      <div>
        <div style={{ fontSize: '0.82rem', color: '#68737d', fontWeight: 600, marginBottom: '0.15rem' }}>
          Flood Response · Hamilton County, IN
        </div>
        <h1 className="title-main" style={{ fontSize: '2.5rem' }}>
          Request help
        </h1>
        <p className="title-sub">
          No account needed. It takes about a minute.
        </p>
      </div>

      {/* 911 Emergency Alert Banner */}
      <div className="danger-alert-box">
        <Phone size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>In danger right now?</strong> Call <a href="tel:911" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 700 }}>911</a> first.
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Needs Grid */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.65rem' }}>
            What do you need?
          </label>
          <div className="need-selector-grid">
            {needsList.map(need => {
              const isSelected = selectedNeed === need.id;
              return (
                <button
                  type="button"
                  key={need.id}
                  onClick={() => setSelectedNeed(need.id)}
                  className={`need-toggle-btn ${isSelected ? 'selected' : ''}`}
                >
                  <div style={{ marginBottom: '0.4rem' }}>{need.icon}</div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
                    {need.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* People Stepper */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.65rem' }}>
            How many people need help?
          </label>
          <div className="stepper-control">
            <button
              type="button"
              onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
              className="stepper-btn"
            >
              <Minus size={18} />
            </button>
            <div className="stepper-display">
              {peopleCount}
            </div>
            <button
              type="button"
              onClick={() => setPeopleCount(peopleCount + 1)}
              className="stepper-btn"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* SMS Phone */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            Phone number for updates
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
            placeholder="(317) 555-0148"
            className="input-field-standard"
          />
          <p style={{ fontSize: '0.8rem', color: '#68737d', marginTop: '0.35rem' }}>
            We text you when help is on the way. A coordinator may call.
          </p>
        </div>

        {/* Location Section */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Where are you?
          </label>
          <button
            type="button"
            onClick={handleUseLocation}
            className="btn-secondary"
            style={{ width: '100%', marginBottom: '0.85rem' }}
          >
            <MapPin size={18} />
            Use my location
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0.5rem 0',
              color: '#8b949e',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: '#dcd7cc' }} />
            <span>or type an address</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#dcd7cc' }} />
          </div>

          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            placeholder="Street address, town"
            className="input-field-standard"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            What's happening?
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Tell us what is happening..."
            className="input-field-standard"
            style={{ resize: 'vertical', lineHeight: 1.45 }}
          />
          <p style={{ fontSize: '0.8rem', color: '#68737d', marginTop: '0.35rem' }}>
            Mention anyone elderly, injured, pregnant, or with a disability.
          </p>
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
          <span>Next: Add photos</span>
          <ChevronRight size={20} />
        </button>
      </form>
    </div>
  );
};
