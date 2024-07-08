import { useEffect, useRef, useState } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { useUserLocal } from '../../hooks/useUserLocal'
import { getVideosUseCase } from '../../../Domain/useCase/student/getVideosStudent'
import {getVideosUseCaseProfesor} from "../../../Domain/useCase/professor/GetVideosProfessor"
// import { Video } from '../../../Domain/entities/Video'
import { VideoClassRepositoryImpl } from '../../../Data/repositories/videosRepository'
import { User } from '../../../Domain/entities/User'
import {getAllUserUseCase} from "../../../Domain/useCase/user/UpdateUser"
const videoRepository = new VideoClassRepositoryImpl();

const screenWidth = Dimensions.get("screen").width

// let contador = 0;

// Define el tipo ClassProps
interface ClassProps {
    id: string;
    title: string;
    viewed: boolean;
    duration: string;
    description: string;
}

export default function useViewModel() {
    const { getUserSession, user } = useUserLocal();
    const [xPosition, setXPosition] = useState(0);
    const [classes, setClasses] = useState<ClassProps[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);

//   if(contador === 0)
//     {
      getAllUserUseCase()
      .then((response) => response.data)
      .then((users:User[]) => 
       {
         const transformedUsers = users.map((user: User) => (
            {
             id: user._id,
             title: user.full_name,
             viewed: false,
             duration: '',
             description: ''
           }));
           setClasses(transformedUsers);
       })
    // }
    // contador++;
    const ScrollTo = (xPosition: number) => {
        scrollViewRef.current?.scrollTo({ 
            x: xPosition,
            animated: true
        });
        setXPosition(xPosition);
    }

    const onEndScroll = (e: any) => {
        const xPosition = e.nativeEvent.contentOffset.x;

        if (xPosition >= screenWidth / 2) {
            ScrollTo(screenWidth * 2);
            setXPosition(screenWidth * 2);
        } else {
            ScrollTo(0);
            setXPosition(0);
        }
    }

    return { xPosition, setXPosition, scrollViewRef, ScrollTo, onEndScroll, classes };
}
