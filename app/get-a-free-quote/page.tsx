'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  homeowner: string;
  vertical: number;
  hassolar: string;
  solartype: string;
  address: string;
  street_number: string;
  route: string;
  city: string;
  state: string;
  state_full: string;
  zip: string;
  latitude: string;
  longitude: string;
  bill: string;
  companyowned: string;
  provider: string;
  purchase: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  call_at: string[];
  wantcheaper: string;
}

export default function GetAFreeQuotePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(8);
  const [formData, setFormData] = useState<FormData>({
    homeowner: '',
    vertical: 1,
    hassolar: '',
    solartype: '',
    address: '',
    street_number: '',
    route: '',
    city: '',
    state: '',
    state_full: '',
    zip: '',
    latitude: '',
    longitude: '',
    bill: '',
    companyowned: '',
    provider: '',
    purchase: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    call_at: [],
    wantcheaper: '',
  });
  const [homeownerError, setHomeownerError] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Load Google Maps script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&language=en&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (addressInputRef.current && window.google) {
        initAutocomplete();
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [step]);

  const initAutocomplete = () => {
    if (!addressInputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      
      let newData = {
        zip: '',
        street_number: '',
        route: '',
        city: '',
        state: '',
        state_full: 'your state',
      };

      if (place.address_components) {
        place.address_components.forEach((component: any) => {
          const types = component.types;
          if (types.includes('postal_code')) {
            newData.zip = component.long_name;
          }
          if (types.includes('street_number')) {
            newData.street_number = component.long_name;
          }
          if (types.includes('route')) {
            newData.route = component.long_name;
          }
          if (types.includes('locality')) {
            newData.city = component.long_name;
          }
          if (types.includes('administrative_area_level_1')) {
            newData.state = component.short_name;
            newData.state_full = component.long_name;
          }
        });

        setFormData((prev) => ({
          ...prev,
          ...newData,
          address: addressInputRef.current?.value || '',
          latitude: place.geometry?.location?.lat()?.toString() || '',
          longitude: place.geometry?.location?.lng()?.toString() || '',
        }));

        setSelectedAddress(true);
        setAddressError(!newData.zip);
        setStreetError(!newData.route && !newData.street_number);
      }
    });
  };

  const changeStep = (newStep: number) => {
    setStep(newStep);
    // Scroll to top on mobile
    if (window.innerWidth < 960) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progress = Math.round((step / totalSteps) * 100);

  const setHomeOwner = (value: string) => {
    setFormData({ ...formData, homeowner: value });
    if (value === 'no') {
      changeStep(2);
    } else {
      changeStep(3);
    }
    if (value === 'commercial') {
      setTotalSteps(11);
    } else {
      setTotalSteps(8);
    }
  };

  const setVertical = (value: number) => {
    setFormData({ ...formData, vertical: value });
    if (value === 6) {
      changeStep(6);
    } else {
      changeStep(4);
    }
  };

  const setHasSolar = (value: string) => {
    setFormData({ ...formData, hassolar: value });
    if (value === 'no') {
      changeStep(6);
    } else {
      changeStep(5);
    }
  };

  const setSolarType = (value: string) => {
    setFormData({ ...formData, solartype: value });
    changeStep(6);
  };

  const setAddress = () => {
    if (formData.address && !addressError && formData.latitude && formData.longitude && !streetError) {
      changeStep(7);
    }
  };

  const setBill = () => {
    if (formData.bill) {
      if (formData.homeowner === 'commercial' && formData.bill === 'Less than 900 $ per quarter') {
        setFormData({ ...formData, bill: '$600-$800 per quarter', homeowner: 'yes', vertical: 1 });
      }
      changeStep(8);
    }
  };

  const setPurchase = (value: string) => {
    setFormData({ ...formData, purchase: value });
    changeStep(11);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const phoneRegex = formData.homeowner === 'commercial' ? /^[0-9]{10}$/ : /^04[0-9]{8}$/;
    const emailRegex = /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

    if (!formData.name) {
      newErrors.name = 'Please enter your name';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = formData.homeowner === 'commercial'
        ? 'Please enter a valid Australian phone number starting with 0.'
        : 'Please enter a valid Australian mobile number starting with 04.';
    }
    if (formData.homeowner === 'commercial') {
      if (!formData.company) {
        newErrors.company = 'Please enter your company name';
      }
      if (!formData.position) {
        newErrors.position = 'Please enter your position';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/free-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Both residential and commercial go to thank you page
        changeStep(13);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCallTime = (time: string) => {
    setFormData(prev => {
      const callAt = prev.call_at.includes(time)
        ? prev.call_at.filter(t => t !== time)
        : [...prev.call_at, time];
      return { ...prev, call_at: callAt };
    });

    // Auto-submit when user selects call times
    setTimeout(() => {
      submitCallTimes();
    }, 500);
  };

  const submitCallTimes = async () => {
    if (formData.call_at.length === 0) return;

    try {
      await fetch('/api/free-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Call time submission error:', error);
    }
  };

  const bills = formData.homeowner !== 'commercial'
    ? ['$400-$600 per quarter', 'More than $600 per quarter']
    : [
        'Less than 900 $ per quarter',
        '900 $ -2000 $ per quarter',
        '2000$ - 4000 $ per quarter',
        '4000- 5000 $ per quarter',
        'More than 5000 $ per quarter',
      ];

  const companies = [
    'AGL',
    'Alinta Energy',
    'Click Energy',
    'CovaU',
    'Dodo Power & Gas',
    'Ergon Energy',
    'EnergyAustralia',
    'Lumo Energy',
    'Mojo Power',
    'Momentum Energy',
    'Online Power & Gas',
    'Origin',
    'Powerdirect',
    'Powershop',
    'Red Energy',
    'Simply Energy',
    'Sumo Power',
    'Synergy',
    'Other',
  ];

  const validAddress = formData.zip !== '';

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          {step !== 13 && (
            <div className="text-center mb-8">
              {step === 12 && formData.homeowner === 'commercial' ? (
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                  Low-Cost Electricity Provider in <span className="text-[#002B5B]">{formData.city}</span>
                </h1>
              ) : (step === 11 && formData.homeowner === 'commercial') || (step === 8 && formData.homeowner !== 'commercial') ? (
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                  Great! We will send you customised Solar estimation to your email.
                </h1>
              ) : !homeownerError ? (
                <>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 tracking-wide">
                    SEE HOW YOU CAN SAVE WITH SOLAR ENERGY
                  </h1>
                 
                </>
              ) : null}
            </div>
          )}

          {/* Progress Bar */}
          {!homeownerError && step !== 13 && (
            <div className="mb-8">
              <div className="w-full bg-gray-200 h-4 overflow-hidden">
                <div
                  className="bg-[#002B5B] h-4 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-white p-6 md:p-12">
            {/* Step 1: Initial Question */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Do you want to take a look at how much you can save In electricity with solar energy?
                  </h2>
                  <h4 className="text-lg text-gray-600 mb-8">Estimate your savings in a few simple steps</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <button
                    onClick={() => setHomeOwner('commercial')}
                    className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8"
                  >
                    YES
                  </button>
                  <button
                    onClick={() => setHomeOwner('no')}
                    className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8"
                  >
                    NO
                  </button>
                  <button
                    onClick={() => setHomeOwner('yes')}
                    className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8 "
                  >
                    RESIDENTIAL PROPERTY
                  </button>
                </div>
                <p className="text-center text-gray-600 mt-6">
                  To qualify for the free eligibility review, you must meet 3 requirements. Please answer the questions{' '}
                  <b>truthfully.</b>
                </p>
              </div>
            )}

            {/* Step 2: Property Electricity Question */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {!homeownerError ? (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                      Does your property consume electricity?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      <button
                        onClick={() => {
                          setFormData({ ...formData, homeowner: 'commercial' });
                          changeStep(3);
                        }}
                        className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setHomeownerError(true)}
                        className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8"
                      >
                        No
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center animate-fadeIn">
                    <p className="text-red-700 text-lg">
                      In order to proceed with a free commercial solar estimate you need to represent an Australian business that
                      consumes electricity.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Solar System Type */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                  What type of solar system do you want to install?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <button onClick={() => setVertical(5)} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    Solar + Battery System
                  </button>
                  <button onClick={() => setVertical(4)} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    Solar Alone
                  </button>
                  <button onClick={() => setVertical(6)} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    Energy Storage Alone
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Already Have Solar */}
            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                  Does your property already possess solar panels installed?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <button onClick={() => setHasSolar('yes')} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    Yes
                  </button>
                  <button onClick={() => setHasSolar('no')} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: What to do with existing solar */}
            {step === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                  What do you want to do with your solar system?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <button onClick={() => setSolarType('replace')} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    Replace the solar system
                  </button>
                  <button onClick={() => setSolarType('expand')} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    Expand your solar system
                  </button>
                  <button onClick={() => setSolarType('repair')} className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 px-8">
                    Repair existing system
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Address */}
            {step === 6 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {formData.homeowner !== 'commercial' ? 'Enter Your Street Address' : 'Please type in the street address of the property.'}
                  </h2>
                  <h4 className="text-gray-600">
                    (we will only use the information to estimate your savings based on your location)
                  </h4>
                </div>
                <div className="max-w-2xl mx-auto">
                  <div className="mb-4">
                    <input
                      ref={addressInputRef}
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#002B5B] focus:outline-none text-lg"
                      placeholder="Address and street number"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        setSelectedAddress(false);
                      }}
                    />
                  </div>
                  {formData.address && !selectedAddress && !addressError && (
                    <p className="text-sm text-orange-600 mb-4">
                      Please select an address from the suggestion list. If you cannot see your address please remove "unit", "suite",
                      "factory", "shed", "villa" etc from your input leaving only numbers in front of the street name.
                    </p>
                  )}
                  {selectedAddress && streetError && (
                    <p className="text-sm text-orange-600 mb-4">
                      Please enter a complete street address. If you cannot see your address please remove "unit", "suite", "factory",
                      "shed", "villa" etc from your input leaving only numbers in front of the street name.
                    </p>
                  )}
                  {selectedAddress && !formData.street_number && !streetError && (
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Tip:</strong> Including a street number in your address will help the installers provide a more accurate
                      quote.
                    </p>
                  )}
                  <div className="text-right">
                    <button
                      onClick={setAddress}
                      disabled={!validAddress || !formData.latitude || !formData.longitude || streetError}
                      className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 px-8 ml-auto"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Energy Bill */}
            {step === 7 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                  How much do you pay in your energy bill?
                </h2>
                <div className="max-w-2xl mx-auto">
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none text-lg mb-6"
                    value={formData.bill}
                    onChange={(e) => setFormData({ ...formData, bill: e.target.value })}
                  >
                    <option value="">Select an item from list</option>
                    {bills.map((bill) => (
                      <option key={bill} value={bill}>
                        {bill}
                      </option>
                    ))}
                  </select>
                  <div className="text-right">
                    <button
                      onClick={setBill}
                      disabled={!formData.bill}
                      className="btn-primary py-3 px-8 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Contact Form (Residential) */}
            {step === 8 && formData.homeowner !== 'commercial' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Compare Quotes on Solar Power</h2>
                  <h4 className="text-gray-600">Please Fill Out Information Below so You Can Receive Your Results</h4>
                </div>
                <div className="max-w-2xl mx-auto space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Your mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div className="text-right pt-4">
                    <button
                      onClick={submitForm}
                      disabled={isSubmitting}
                      className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 px-8 ml-auto"
                    >
                      {isSubmitting ? 'Please wait...' : 'Get Results'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Commercial Steps 8-11 */}
            {step === 8 && formData.homeowner === 'commercial' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                  Does Your Company Own the Property?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, companyowned: 'yes' });
                      changeStep(9);
                    }}
                    className="btn-primary py-4 px-8"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, companyowned: 'no' });
                      changeStep(9);
                    }}
                    className="btn-primary py-4 px-8"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {step === 9 && formData.homeowner === 'commercial' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">What is your electricity company?</h2>
                  <h4 className="text-gray-600">(select "other" if you don't find it in the list)</h4>
                </div>
                <div className="max-w-2xl mx-auto">
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none text-lg mb-6"
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  >
                    <option value="">Please select</option>
                    {companies.map((company) => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                  <div className="text-right">
                    <button
                      onClick={() => changeStep(10)}
                      disabled={!formData.provider}
                      className="btn-primary py-3 px-8 text-lg font-semibold disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 10 && formData.homeowner === 'commercial' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                  What finance option do you prefer?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  <button onClick={() => setPurchase('Lease')} className="btn-primary py-4 px-6">
                    Lease
                  </button>
                  <button onClick={() => setPurchase('PPA')} className="btn-primary py-4 px-6">
                    PPA
                  </button>
                  <button onClick={() => setPurchase('Purchase')} className="btn-primary py-4 px-6">
                    Purchase
                  </button>
                  <button onClick={() => setPurchase('I dont know')} className="btn-primary py-4 px-6">
                    I don't know
                  </button>
                </div>
              </div>
            )}

            {step === 11 && formData.homeowner === 'commercial' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    You are closer to receive your solar estimate!
                  </h2>
                  <h4 className="text-gray-600">(Just fill out the remaining information below!):</h4>
                </div>
                <div className="max-w-2xl mx-auto space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Please provide company name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Enter Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                    {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Position</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Your Position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                    {errors.position && <p className="text-red-600 text-sm mt-1">{errors.position}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div className="text-right pt-4">
                    <button
                      onClick={submitForm}
                      disabled={isSubmitting}
                      className="bg-[#002866] text-white font-bold hover:bg-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 px-8 ml-auto"
                    >
                      {isSubmitting ? 'Please wait...' : 'Get Results'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 13: Thank You */}
            {step === 13 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Thank you {formData.name}!
                  </h1>
                  <h3 className="text-xl text-gray-600 mb-6">for trusting your solar estimate to USE</h3>
                </div>

                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                    {formData.homeowner === 'commercial'
                      ? 'Your request for a Solar Power quotation and savings estimate has been received.'
                      : 'Your request for quotes has been received.'}
                  </h3>
                  <p className="text-lg text-gray-700 text-center">
                    We will analyze the information that you provided and give you an estimate for your system in no time!
                  </p>
                </div>

                {formData.call_at.length === 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
                      Please advise when you are available to receive these calls:
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {[
                        'Early morning (8AM-9AM)',
                        'Late morning (9AM-12noon)',
                        'Lunchtime (12noon-1PM)',
                        'Afternoon (1PM-5PM)',
                        'Evening (5PM-7PM)',
                      ].map((time) => (
                        <button
                          key={time}
                          onClick={() => toggleCallTime(time)}
                          className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                            formData.call_at.includes(time)
                              ? 'bg-[#FFD700] text-[#002B5B] shadow-lg'
                              : 'bg-[#002B5B] text-white hover:bg-[#FFD700] hover:text-[#002B5B]'
                          }`}
                        >
                          {time.replace(/\s*\([^)]*\)/, '')}
                        </button>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-gray-800 mb-2">Why is a call required?</h4>
                      <p className="text-gray-700 text-sm">
                        Installing or upgrading a solar power and/or energy storage system requires the advice of a certified expert.
                        The expert will take into account things like the property location, roof type, orientation, tilt, electricity
                        consumption, existing systems and usage patterns when presenting you with a quote. By using our free service you
                        have agreed to receive up to three quotes, however, there is no obligation to accept any quote given to you.
                      </p>
                    </div>
                  </div>
                )}

                {formData.call_at.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-green-800 mb-2 text-center">Thank you!</h4>
                    <p className="text-gray-700 text-center">
                      We've received your preferred call times. A solar expert will contact you during:{' '}
                      <strong>{formData.call_at.join(', ')}</strong>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Logos and Privacy Section */}
          <div className="mt-12 space-y-8">
            {/* Certification Logos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center">
                <img 
                  src="/img/get-a-free-quote/logo1.png" 
                  alt="All Energy Australia Conference 2017" 
                  className="h-20 md:h-24 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/img/get-a-free-quote/logo2.png" 
                  alt="Clean Energy Council Accredited Installer" 
                  className="h-20 md:h-24 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/img/get-a-free-quote/logo3.png" 
                  alt="Clean Energy Council Accredited Designer" 
                  className="h-20 md:h-24 w-auto object-contain"
                />
              </div>
            </div>

            {/* Ultimate Solar Energy Logo */}
            <div className="flex justify-center">
              <img 
                src="/img/get-a-free-quote/logo4.png" 
                alt="Ultimate Solar Energy" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            {/* Privacy Text */}
            <div className="max-w-4xl mx-auto text-center px-4">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Your privacy is very important. We take security seriously and we only use the information provided to estimate your solar savings over time. By answering these questions, you agree to be contacted by a solar consultant via the mobile or phone number that you provide in this form. Besides, by filling the information, you also agree to{' '}
                <a href="/terms-and-conditions" className="text-[#002B5B] hover:text-[#FFD700] underline">
                  Terms of Use
                </a>
                {' '}and{' '}
                <a href="/terms-and-conditions" className="text-[#002B5B] hover:text-[#FFD700] underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-primary {
          @apply bg-[#002B5B] hover:bg-[#FFD700] 
                 text-white hover:text-[#002B5B] 
                 transition-all duration-300 
                 font-bold text-base md:text-lg
                 shadow-md hover:shadow-lg
                 border-2 border-[#002B5B] hover:border-[#002B5B]
                 rounded-md
                 cursor-pointer
                 uppercase;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }

        input:focus, select:focus, textarea:focus {
          @apply ring-2 ring-[#002B5B]/30;
        }
      `}</style>
    </div>
  );
}

declare global {
  interface Window {
    google: any;
  }
}

