import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@rneui/base';

import FCQuantityInput from './FCQuantityInput';

export default function FCMedInNorm(props) {
	const [Qty, setQty] = useState(props.normQty);

	const GetQtyFromInput = (Qty) => {
		setQty(Qty);
	}

	return (
		<View>
			<Card borderColor='#E1EAF9'>
			{props.isRequest && (
					<>
						<TouchableOpacity style={styles.CloseBTN} onPress={() => props.getId2Delete(props.id)}>
							<Ionicons name='close-outline' color='#003D9A' size={22} />
						</TouchableOpacity>
					</>
				)}
				<Text style={styles.cardTitle}>{props.medName}</Text>
				{!props.isRequest && (<Text style={styles.cardBody}>כמות התקן: {props.normQty}</Text>)}
				{props.isRequest && (<View style={styles.cardBody}><FCQuantityInput reqQty={props.normQty} sendQty={GetQtyFromInput} /></View>)}
			</Card>
		</View>
	)
}

const styles = StyleSheet.create({
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		color: "#003D9A",
	},
	cardBody: {
		fontSize: 15,
		color: "#003D9A",
	},
	CloseBTN: {
		alignSelf: 'flex-start',
	},
});