import { useState } from 'react';
import { User, Users } from 'lucide-react';
import logo from '../assets/images/eden-logo-no-bg.png';


const OnboardingApp = () => {
  const [step, setStep] = useState(1);
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    workspaceName: '',
    workspaceUrl: '',
    usage: ''
  });
  const [showTable, setShowTable] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.displayName;
      case 2:
        return formData.workspaceName;
      case 3:
        return formData.usage;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 3) {
        if (editIndex !== null) {
          const updatedEntries = [...entries];
          updatedEntries[editIndex] = formData;
          setEntries(updatedEntries);
          setEditIndex(null);
        } else {
          setEntries([...entries, formData]);
        }
        setStep(4);
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleEdit = (index) => {
    setFormData(entries[index]);
    setEditIndex(index);
    setStep(1);
    setShowTable(false);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Welcome! First things first...</h1>
            <p className="text-gray-500">You can always change them later.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Let's set up a home for all your work</h1>
            <p className="text-gray-500">You can always create another workspace later.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Workspace Name</label>
                <input
                  type="text"
                  name="workspaceName"
                  value={formData.workspaceName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Workspace URL <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  name="workspaceUrl"
                  value={formData.workspaceUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">How are you planning to use Eden?</h1>
            <p className="text-gray-500">We'll streamline your setup experience accordingly.</p>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 border rounded cursor-pointer ${
                  formData.usage === 'myself' ? 'border-purple-600' : ''
                }`}
                onClick={() => setFormData({ ...formData, usage: 'myself' })}
              >
                <User className="mb-2" />
                <h3 className="font-medium">For myself</h3>
                <p className="text-sm text-gray-500">Write better. Think more clearly. Stay organized.</p>
              </div>
              <div
                className={`p-4 border rounded cursor-pointer ${
                  formData.usage === 'team' ? 'border-purple-600' : ''
                }`}
                onClick={() => setFormData({ ...formData, usage: 'team' })}
              >
                <Users className="mb-2" />
                <h3 className="font-medium">With my team</h3>
                <p className="text-sm text-gray-500">Wikis, docs, tasks & projects, all in one place.</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Congratulations, {formData.displayName}!</h1>
            <p className="text-gray-500">You have completed onboarding, you can start using Eden!</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderTable = () => (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Display Name</th>
              <th className="p-2 border">Workspace</th>
              <th className="p-2 border">Usage</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td className="p-2 border">{entry.fullName}</td>
                <td className="p-2 border">{entry.displayName}</td>
                <td className="p-2 border">{entry.workspaceName}</td>
                <td className="p-2 border">{entry.usage}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
        <img src={logo} alt="Eden logo" className="mx-auto mb-8" />

          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((number) => (
              <div key={number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    number <= step ? 'bg-purple-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {number}
                </div>
                {number < 4 && (
                  <div
                    className={`w-12 h-0.5 ${
                      number < step ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}

        <div className="space-y-4">
          {step < 5 && (
            <button
              onClick={handleNext}
              className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {step === 4 ? 'Launch Eden' : 'Create Workspace'}
            </button>
          )}
          
          {step === 4 && (
            <button
              onClick={() => setShowTable(true)}
              className="w-full py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              View All Entries
            </button>
          )}
        </div>

        {showTable && renderTable()}
      </div>
    </div>
  );
};

export default OnboardingApp;