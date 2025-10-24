import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I add a tutorial?',
      answer: 'Go to the "Add Tutorial" page, fill in the required fields, and click submit to publish your tutorial.',
    },
    {
      question: 'Can I update my tutorial later?',
      answer: 'Yes, you can edit your tutorial anytime from the "My Tutorials" section by clicking the update button.',
    },
    {
      question: 'How do I delete a tutorial?',
      answer: 'In the "My Tutorials" section, click the delete button next to the tutorial you want to remove.',
    },
    {
      question: 'Is there any fee for adding tutorials?',
      answer: 'No, adding tutorials is completely free on this platform.',
    },
    {
      question: 'What languages are supported for tutorials?',
      answer: 'Currently, we support English, Spanish, French, German, Chinese, Japanese, Arabic, Hindi, and Portuguese.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='bg-base-200 py-10'>
    <div className="max-w-4xl mx-auto  px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => toggleCollapse(index)}
              className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center"
            >
              {faq.question}
              <span className="ml-2">
                {activeIndex === index ? '▲' : '▼'}
              </span>
            </button>

            {activeIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQ;
