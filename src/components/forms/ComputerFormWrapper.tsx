import ComputerForm from './ComputerForm';

interface ComputerFormWrapperProps {
  onBack: () => void;
  onGenerateDescription: (data: any) => void;
}

const ComputerFormWrapper = ({ onBack, onGenerateDescription }: ComputerFormWrapperProps) => {
  return (
    <ComputerForm 
      onBack={onBack} 
      onGenerateDescription={onGenerateDescription} 
    />
  );
};

export default ComputerFormWrapper;