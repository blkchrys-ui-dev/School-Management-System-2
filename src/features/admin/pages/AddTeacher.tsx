import { useState, type FormEvent } from 'react';
import { ArrowLeft, BadgeCheck, Mail, Phone, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Header from '../../../components/layout/Header/Header';
import Sidebar from '../../../components/layout/Sidebar/Sidebar';
import Footer from '../../../components/layout/Footer/Footer';
import Button from '../../../components/ui/Button/Button';
import { generateId } from '../../../utils/generateId';
import '../styles/addTeacher.css';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  qualification: '',
  joiningDate: '',
};

const AddTeacher = (): React.ReactElement => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [employeeId, setEmployeeId] = useState(generateId('TCH'));
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSuccessMessage(`${formData.firstName || 'Teacher'} has been prepared with employee ID ${employeeId}.`);
    setFormData(INITIAL_FORM);
    setEmployeeId(generateId('TCH'));
  };

  return (
    <div className="principal-page-wrapper">
      <Header open={open} setOpen={setOpen} />
      <div className="principal-layout">
        <Sidebar open={open} />
        <main className="principal-content add-teacher-page">
          <button type="button" className="add-teacher-back" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Back</button>
          <section className="add-teacher-hero">
            <div><span><UserPlus size={22} /> Staff onboarding</span><h1>Add Teacher</h1><p>Create a clean teacher profile with core contact, subject, and joining details.</p></div>
            <div className="employee-id"><BadgeCheck size={20} /><span>{employeeId}</span></div>
          </section>

          <form className="add-teacher-form" onSubmit={handleSubmit}>
            {[
              ['firstName', 'First name', 'text'],
              ['lastName', 'Last name', 'text'],
              ['email', 'Email address', 'email'],
              ['phone', 'Phone number', 'tel'],
              ['subject', 'Primary subject', 'text'],
              ['qualification', 'Qualification', 'text'],
              ['joiningDate', 'Joining date', 'date'],
            ].map(([name, label, type]) => (
              <label key={name}>
                <span>{label}</span>
                <input type={type} name={name} value={formData[name as keyof typeof formData]} onChange={event => setFormData(prev => ({ ...prev, [name]: event.target.value }))} required={['firstName', 'email', 'subject'].includes(name)} />
              </label>
            ))}

            <div className="add-teacher-actions">
              <Button type="button" variant="secondary" onClick={() => setFormData(INITIAL_FORM)}>Reset</Button>
              <Button type="submit">Save teacher</Button>
            </div>
          </form>

          {successMessage && <div className="add-teacher-success"><Mail size={18} /> {successMessage} <span><Phone size={16} /> Ready for backend API</span></div>}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AddTeacher;
