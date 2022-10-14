import styled from 'styled-components';

export const Title = styled.h1`
	font-weigth: 800;
	font-size: clamp(25px, ${props => props.font}, 35px);
	line-height: 35px;
	color: ${props => props.color || '#fff'};
	font-family: 'OpenSans-bold', sans;
`;
