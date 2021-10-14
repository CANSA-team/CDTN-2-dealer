import { useContext } from 'react'
import { NavigationContext, NavigationScreenProp, NavigationParams,NavigationRoute } from 'react-navigation';

export function useNavigation(){

    return useContext(NavigationContext) as NavigationScreenProp<NavigationRoute, NavigationParams>

}