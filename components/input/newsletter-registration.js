import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const emailRef = useRef(null);
    const [submitMessage, setSubmitMessage] = useState(null);

    async function registrationHandler(event) {
        event.preventDefault();
        const email = emailRef.current.value;

        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            timeout: 3000,
        };

        try {
            const response = await fetch('/api/newsletter', reqOptions);
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            setSubmitMessage(`${data.message}: ${data.email}`);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        ref={emailRef}
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                    />
                    <button>Register</button>
                </div>
            </form>
            {submitMessage && <p>{submitMessage}</p>}
        </section>
    );
}

export default NewsletterRegistration;
