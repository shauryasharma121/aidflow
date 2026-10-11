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

  const handleUseLocation = () => {
    // Simulate mobile GPS geocoding
    setAddress('214 S 9th St, Noblesville, IN 46060');
    setTown('Noblesville');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the preliminary request or store in state
    const newId = createRequest({
      needType: selectedNeed,
      peopleCount,
      address,
      town: town || 'Noblesville',
      phone: phoneNumber,
      description,
      hasPhoto: true, // Will be confirmed or skipped in step 2
    });

    // Navigate to step 2 (Add photos) with ticket reference
    navigate('/request/photos', { state: { requestId: newId } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Page Header */}
      <div>
        <div style={{ fontSize: '0.82rem', color: '#68737d', fontWeight: 600, marginBottom: '0.15rem' }}>
          Flood Response · Hamilton County, IN
        </div>
        <h1 style={{ fontSize: '2.5rem', lineHeight: 1.05, textTransform: 'none', marginBottom: '0.25rem' }}>
          Request help
        </h1>
        <p style={{ color: '#56606a', fontSize: '0.95rem' }}>
          No account needed. It takes about a minute.
        </p>
      </div>

      {/* 911 Emergency Alert Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: '#faebe7',
          border: '1px solid #f2d2ca',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          color: '#8b271d',
          fontSize: '0.95rem',
        }}
      >
        <Phone size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>In danger right now?</strong> Call <a href="tel:911" style={{ color: '#8b271d', textDecoration: 'underline', fontWeight: 700 }}>911</a> first.
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Need Type Selection */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.65rem' }}>
            What do you need?
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.55rem',
            }}
          >
            {needsList.map(need => {
              const isSelected = selectedNeed === need.id;
              return (
                <button
                  type="button"
                  key={need.id}
                  onClick={() => setSelectedNeed(need.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.9rem 0.5rem',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? '#15212d' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#1f2a36',
                    border: isSelected ? '1px solid #15212d' : '1px solid #d9d4c7',
                    boxShadow: isSelected ? '0 3px 8px rgba(21, 33, 45, 0.2)' : '0 1px 2px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease',
                    minHeight: '82px',
                  }}
                >
                  <div style={{ marginBottom: '0.4rem', color: isSelected ? '#ffffff' : '#273442' }}>
                    {need.icon}
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
                    {need.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* How many people need help? */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.65rem' }}>
            How many people need help?
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
              style={{
                width: '54px',
                height: '48px',
                borderRadius: '8px',
                border: '1.5px solid #1f2a36',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1f2a36',
              }}
            >
              <Minus size={18} />
            </button>
            <div
              style={{
                width: '80px',
                height: '48px',
                borderRadius: '8px',
                border: '1.5px solid #1f2a36',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1f2a36',
              }}
            >
              {peopleCount}
            </div>
            <button
              type="button"
              onClick={() => setPeopleCount(peopleCount + 1)}
              style={{
                width: '54px',
                height: '48px',
                borderRadius: '8px',
                border: '1.5px solid #1f2a36',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1f2a36',
              }}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Phone number */}
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
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1.5px solid #1f2a36',
              fontSize: '1rem',
              fontWeight: 500,
              backgroundColor: '#ffffff',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: '0.8rem', color: '#68737d', marginTop: '0.35rem' }}>
            We text you when help is on the way. A coordinator may call.
          </p>
        </div>

        {/* Location */}
        <div>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Where are you?
          </label>
          <button
            type="button"
            onClick={handleUseLocation}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              border: '1.5px solid #1f2a36',
              backgroundColor: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#1f2a36',
              marginBottom: '0.85rem',
            }}
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
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1.5px solid #1f2a36',
              fontSize: '1rem',
              fontWeight: 500,
              backgroundColor: '#ffffff',
              outline: 'none',
            }}
          />
        </div>

        {/* What's happening? */}
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
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              border: '1.5px solid #1f2a36',
              fontSize: '0.95rem',
              backgroundColor: '#ffffff',
              outline: 'none',
              resize: 'vertical',
              lineHeight: 1.45,
            }}
          />
          <p style={{ fontSize: '0.8rem', color: '#68737d', marginTop: '0.35rem' }}>
            Mention anyone elderly, injured, pregnant, or with a disability.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#c44d25',
            color: '#ffffff',
            fontSize: '1.05rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(196, 77, 37, 0.25)',
            transition: 'background-color 0.15s ease',
          }}
        >
          <span>Next: Add photos</span>
          <ChevronRight size={20} />
        </button>
      </form>
    </div>
  );
};
