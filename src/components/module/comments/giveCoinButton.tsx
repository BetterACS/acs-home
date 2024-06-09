import { trpc } from '@/app/_trpc/client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { User } from '@/database/models';
import Image from 'next/image';
import { useState } from 'react';

function CoinCard(props: any) {
    const { coin, onClick } = props;

    return (
        <div onClick={() => onClick(coin)} className="flex flex-row items-center space-x-2 border-2 border-gray-100 p-[5px] rounded-md hover:scale-[105%] cursor-pointer">
            <p>{coin}</p>
            <Image alt="coin" src="/coin.gif" width={20} height={20} />
        </div>
    );
}

function CoinInputCard(props: any) {
    const [coinValue, setCoinValue] = useState(0);
	const {handleSubmit} = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoinValue(parseInt(event.target.value));
		console.log(event.target.value)
    };

    return (
        <div className="flex flex-row items-center space-x-2 border-2 border-gray-100 p-[5px] rounded-md hover:scale-[105%] cursor-pointer">
            <input 
                autoFocus 
                type="number" 
                value={coinValue} 
                onChange={handleChange} 
                className="w-[45px]" 
            />
            <Image onClick={() => handleSubmit(coinValue)} alt="coin" src="/coin.gif" width={20} height={20} />
            {/* <button ></button> */}
        </div>
    );
}


export default function GiveCoinButton(props:any) {
	const { setCoinDependency,userData,postCoin,postID,setCoinGithubDependency,user_id_foreign,isLoggedIn ,user_id_foreign_comment} = props;
	console.log("type",typeof setCoinGithubDependency)
	const mutation = trpc.editPostCoin.useMutation({
		onSuccess: (data) => {
			setCoinDependency(true);
			// setCoinGithubDependency(true);
		},
		onError: (error: any) => {
			console.error('Failed to pay:', error);
			alert('Failed to pay');
		},
		onSettled: () => {
			console.log('settled');
		},
	});
	const coinMutation = trpc.editUserCoin.useMutation({
		onSuccess: (data) => {
			
		},
		onError: (error: any) => {
			console.error('Failed to pay to payee:', error);
			alert('Failed to pay to payee');
		},
		onSettled: () => {
			console.log('settled');
		},
	});

	const query = trpc.useUtils();
	const onClickcoin = async (coin:number) => {
		const currentCoin = postCoin;
		if (currentCoin < coin) {
			alert('You do not have enough coin');
			return;
		}

		const newCoinValue = currentCoin - coin;
		
		const coinData = {
			_id: postID,
			newCoinValue: newCoinValue,
		};

		console.log('coinData', coin);
		
		const response = await mutation.mutate(coinData);

		const userResult = await query.getUserBy_id.fetch({ _id: JSON.stringify(user_id_foreign_comment).replace(/"/g, '') });
		const userPayee = userResult.data.data as User;
		// console.log('userPayee', userPayee);
		// console.log('userPayee.coin', userPayee.coin);
		// console.log('userResult', userResult);
		const coinAddData = {
			_id: user_id_foreign_comment,
			newCoinValue: (userPayee?.coin || 0) + coin,
		};

		const coinResponse = await coinMutation.mutate(coinAddData)
		
	};
	return (
		<HoverCard>

		{ isLoggedIn&&(user_id_foreign===userData._id)&&(userData._id!==user_id_foreign_comment)&&<HoverCardTrigger className="py-[2px] px-[8px] text-sm border-2 rounded-md cursor-pointer">
				Give
			</HoverCardTrigger>}
			<HoverCardContent>
				<div className="flex flex-row items-center space-x-2 justify-center">
					<CoinCard coin="5" onClick={() => onClickcoin(5)}/>
					<CoinCard coin="25" onClick={() => onClickcoin(25)}/>
					<CoinInputCard handleSubmit={onClickcoin}/>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
