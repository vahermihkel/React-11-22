import { useRef } from "react";
import emailjs from '@emailjs/browser';

function ContactUs() {

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const sendEmail = () => {

    const emailData = {
      "from_name": nameRef.current.value,
      "from_email": emailRef.current.value,
      "message": messageRef.current.value
    }

    //  send saadab võti-väärtus paaridega
    emailjs.send('service_fum24bj', 'template_ld2lsyd', emailData, 'Xbn0xj_4LjNugxYGl')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div>
      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Email</label> <br />
      <input ref={emailRef} type="email" /> <br />
      <label>Message</label> <br />
      <textarea ref={messageRef} name="message" /> <br />
      <button onClick={sendEmail}>Send</button> <br />
    </div>
  )
}

export default ContactUs