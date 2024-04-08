'use client';
import { Section } from '@/components/section';
import { Modal } from '@/components/Modal/modal';
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { Button } from '@/components/button';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { useRouter } from 'next/navigation';
import { SignInOptions, signIn } from 'next-auth/react';

export interface ModalProps {
  open: boolean;
  email: string;
  setOpen: (open: boolean) => void;
}

export default function RegisterModal({ open, email, setOpen }: ModalProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClose = () => {
    setError(false);
    setErrorText('');
    setSuccess(false);
  };

  const onSubmit = async (e) => {
    const data = {
      email: email,
      verification_code: otp,
      formType: 'confirmRegistration'
    };
    const dataJSON = JSON.stringify(data);

    if (otp.length === 6 && !loading) {
      setLoading(true);
      await fetch('/api/client/confirmregistration', {
        method: 'POST',
        body: dataJSON
      }).then(async (res) => {
        setLoading(false);

        if (res.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            signIn('default', {
              redirect: false,
              ...data
            } as SignInOptions).then(() => {
              setOpen(false);
              router.push('/');
            });
          }, 500);
        } else {
          res.json().then((data) => {
            setError(true);
            setErrorText(data.error);
          });
        }
      });
    } else if (!loading && otp.length < 6) {
      setError(true);
      setErrorText('Please enter a 6-digit code.');
    }
  };

  return (
    <>
      <Modal
        wrapperId="Popup"
        open={open}
        setOpen={setOpen}
        onClose={onClose}
        title={'Confirmation Code'}
      >
        <Section className="flex flex-col items-center">
          <div className="text-white text-2xl mt-4 mb-1">Enter Code</div>
          <div className="text-gray-300 mb-8">
            Enter the 6-digit code sent by WoWTasker Email Provider.
          </div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={''}
            inputType="number"
            containerStyle={clsx('gap-1', error ? 'mb-2' : 'mb-12')}
            renderInput={(props) => (
              <input
                {...props}
                className={clsx(
                  '!w-12 h-12 rounded border-2 border-primary-darker text-lg font-bold text-gray-500',
                  error && '!border-error !border'
                )}
              />
            )}
          />
          {error && (
            <div className="mb-12 text-error font-bold text-sm">
              {errorText}
            </div>
          )}
          <Button className="w-full" onClick={onSubmit} loading={loading}>
            {success ? (
              <FontAwesomeIcon icon={faCheckCircle} />
            ) : (
              <div>Confirm</div>
            )}
          </Button>
        </Section>
      </Modal>
    </>
  );
}
