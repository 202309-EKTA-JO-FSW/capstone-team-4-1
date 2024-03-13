import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [formStatus, setFormStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
         alert(JSON.stringify(data, null, 2));
      setFormStatus({ type: 'success', message: 'Form submitted successfully!' });
      setTimeout(() => setFormStatus(null), 3000); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      {formStatus && (
        <div className={`mb-4 p-3 ${formStatus.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'} rounded-md`}>
          {formStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" {...register('name', { required: 'Name is required' })} className="mt-1 p-2 w-full border-gray-300 rounded-md" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} className="mt-1 p-2 w-full border-gray-300 rounded-md" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input type="text" id="subject" {...register('subject', { required: 'Subject is required' })} className="mt-1 p-2 w-full border-gray-300 rounded-md" />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea id="message" {...register('message', { required: 'Message is required' })} rows="4" className="mt-1 p-2 w-full border-gray-300 rounded-md" />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
