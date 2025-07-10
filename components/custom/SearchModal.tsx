import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MagnifyingGlass from '@/public/icons/MagnifyingGlassIcon';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

type Props = {
  className?: string;
  textTrigger?: ReactNode;
};

const SearchModal = ({ className, textTrigger }: Props) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {}, [searchText]);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          {textTrigger ?? <MagnifyingGlass className="w-6 h-6" />}
        </DialogTrigger>
        <DialogContent className="p-0">
          <DialogTitle className="hidden"></DialogTitle>
          <div className="flex border-[1px] gap-2 border-gray-400 p-2 rounded-sm m-4 mb-0 shadow-lg">
            <MagnifyingGlass className="w-6 h-6" />
            <input
              autoFocus
              value={searchText}
              type="text"
              placeholder="Search Post..."
              className="w-full hover:border-none focus-within:outline-none"
              onChange={handleSearchTextChange}
            />
          </div>
          <div className="bg-gray-200 w-full min-h-[100px] max-h-[300px] overflow-y-auto px-4 py-2"></div>
          <div className="w-full flex items-center pb-3">
            {searchText.length > 0 && (
              <p className="text-[0.8rem] px-4">3 results</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchModal;
