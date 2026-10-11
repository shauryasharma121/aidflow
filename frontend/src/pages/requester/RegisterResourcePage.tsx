import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { Check } from 'lucide-react';

export const RegisterResourcePage: React.FC = () => {
  const navigate = useNavigate();
  const { registerResource } = useAidFlow();

  const [orgName, setOrgName] = useState('Grace Community Church Shelter');
  const [type, setType] = useState('Shelter');
  const [capacity, setCapacity] = useState(60);
  const [streetAddress, setStreetAddress] = useState('5504 E 146th St, Noblesville, IN 46062');
  const [selectedOffers, setSelectedOffers] = useState<string[]>([
    'Overnight beds',
    'Hot meals',
    'Pets allowed',
  ]);
  const [isOpen24Hours, setIsOpen24Hours] = useState(true);
  const [opensTime, setOpensTime] = useState('');
  const [closesTime, setClosesTime] = useState('');
  const [contactName, setContactName] = useState('Pastor David Clark');
  const [phone, setPhone] = useState('(317) 555-8821');
  const [email, setEmail] = useState('info@gracecommunity.example');
  const [submitted, setSubmitted] = useState(false);

  const availableOffers = [
    'Overnight beds',
    'Hot meals',
    'Drinking water',
    'Showers',
    'Phone charging',
    'Pets allowed',
    'Medical care',
    'Cleaning supplies',
    'Clothing',
  ];

  const toggleOffer = (offer: string) => {
    setSelectedOffers(prev =>
      prev.includes(offer) ? prev.filter(o => o !== offer) : [...prev, offer]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerResource({
      organizationName: orgName,
      type,
      capacity,
      streetAddress,
      amenities: selectedOffers,
      isOpen24Hours,
      opensTime,
      closesTime,
      contactName,
      phone,
      email,
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/coordinator/referrals');
    }, 1800);
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column: Explainer and Steps */}
        <div>
          <div style={{ fontSize: '0.82rem', color: '#68737d', fontWeight: 600, marginBottom: '0.2rem' }}>
            Flood Response · Hamilton County, IN
          </div>
          <h1 style={{ fontSize: '2.6rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
            Register a local resource
          </h1>
          <p style={{ color: '#4a545e', fontSize: '0.98rem', lineHeight: 1.5, marginBottom: '2rem' }}>
            Coordinators can send people to you during the flood response. Tell us what you offer and when you're open.
          </p>

          {/* Stepper Guide */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#162330',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#16202a' }}>
                  You submit this form
                </strong>
                <span style={{ fontSize: '0.82rem', color: '#68737d' }}>
                  Takes about three minutes.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#162330',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#16202a' }}>
                  A coordinator approves it
                </strong>
                <span style={{ fontSize: '0.82rem', color: '#68737d' }}>
                  They may call to confirm details.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#162330',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#16202a' }}>
                  You appear in Refer Out
                </strong>
                <span style={{ fontSize: '0.82rem', color: '#68737d' }}>
                  Coordinators can send requesters your address and hours by text.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2dcce',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#162330',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <Check size={32} strokeWidth={3} />
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Resource Submitted
              </h2>
              <p style={{ color: '#56606a', fontSize: '0.95rem' }}>
                Thank you! Your resource has been received. Redirecting to coordinator referral queue...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Organization name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Organization name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1.5px solid #1f2a36',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Type and Capacity */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1.5px solid #1f2a36',
                      fontSize: '0.95rem',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="Shelter">Shelter</option>
                    <option value="Food Bank">Food Bank / Meal Center</option>
                    <option value="Medical Supply Station">Medical Supply Station</option>
                    <option value="Community Hub">Community Hub</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Capacity (people)
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={e => setCapacity(Number(e.target.value))}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1.5px solid #1f2a36',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Street address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Street address
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  placeholder="Street, city, ZIP"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1.5px solid #1f2a36',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* What you offer checkboxes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  What you offer <span style={{ fontWeight: 500, color: '#68727d' }}>(pick all that apply)</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {availableOffers.map(offer => {
                    const checked = selectedOffers.includes(offer);
                    return (
                      <button
                        type="button"
                        key={offer}
                        onClick={() => toggleOffer(offer)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '999px',
                          border: checked ? '1.5px solid #141d24' : '1px solid #d5cec2',
                          backgroundColor: checked ? '#f2f0eb' : '#ffffff',
                          fontWeight: checked ? 700 : 500,
                          fontSize: '0.85rem',
                          color: '#16202a',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            backgroundColor: checked ? '#141d24' : '#ffffff',
                            border: checked ? 'none' : '1.5px solid #8b95a0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {checked && <Check size={12} strokeWidth={3} color="#ffffff" />}
                        </div>
                        <span>{offer}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Operating Hours */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Opens
                  </label>
                  <input
                    type="text"
                    disabled={isOpen24Hours}
                    value={isOpen24Hours ? '--:-- --' : opensTime}
                    onChange={e => setOpensTime(e.target.value)}
                    placeholder="8:00 AM"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cfc8bd',
                      backgroundColor: isOpen24Hours ? '#f5f3ee' : '#ffffff',
                      color: isOpen24Hours ? '#8a939e' : '#141d24',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Closes
                  </label>
                  <input
                    type="text"
                    disabled={isOpen24Hours}
                    value={isOpen24Hours ? '--:-- --' : closesTime}
                    onChange={e => setClosesTime(e.target.value)}
                    placeholder="8:00 PM"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cfc8bd',
                      backgroundColor: isOpen24Hours ? '#f5f3ee' : '#ffffff',
                      color: isOpen24Hours ? '#8a939e' : '#141d24',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setIsOpen24Hours(!isOpen24Hours)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: isOpen24Hours ? '1.5px solid #141d24' : '1px solid #cfc8bd',
                      backgroundColor: isOpen24Hours ? '#f2f0eb' : '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: '#141d24',
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        backgroundColor: isOpen24Hours ? '#141d24' : '#ffffff',
                        border: isOpen24Hours ? 'none' : '1.5px solid #8b95a0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isOpen24Hours && <Check size={12} strokeWidth={3} color="#ffffff" />}
                    </div>
                    <span>Open 24 hours</span>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Contact name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1.5px solid #1f2a36',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1.5px solid #1f2a36',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cfc8bd',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Submission and Privacy Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #eee8dd',
                  paddingTop: '1.25rem',
                  marginTop: '0.5rem',
                }}
              >
                <p style={{ fontSize: '0.78rem', color: '#68737d', maxWidth: '340px', lineHeight: 1.35 }}>
                  Your contact details are only shared with coordinators. Requesters see your name, address, hours, and what you offer.
                </p>

                <button
                  type="submit"
                  style={{
                    padding: '0.85rem 1.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#c44d25',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    boxShadow: '0 4px 12px rgba(196, 77, 37, 0.25)',
                  }}
                >
                  Submit for approval
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
