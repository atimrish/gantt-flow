import {Modal} from "@src/shared/ui/modal";
import {ModalProps} from "@src/shared/ui/modal/Modal";
import {TextInput} from "@src/shared/ui/text-input/TextInput";
import {FormEvent, useState} from "react";
import {Typography} from "@src/shared/ui/typography";
import {DatePicker} from "@src/widgets/date-picker";
import * as s from './CreateTaskModal.css'
import {Textarea} from "@src/shared/ui/textarea/Textarea";
import {colors} from '@src/shared/config'
import {Button} from "@src/shared/ui/button";
import {ColorPick} from "@src/widgets/create-task-modal/ui/color-pick/ColorPick";
import {useRootContext} from "@src/app/providers/rootProvider";
import {splitDate} from "@src/widgets/create-task-modal/lib/split-date";
import {CreateTaskData} from "@src/entities/task/api/createTask";
import {validateTaskCreateData} from "@src/widgets/create-task-modal/model";

export const CreateTaskModal = (p: ModalProps) => {
    const {task} = useRootContext()

    const [formState, setFormState] = useState({
        name: '',
        start: '',
        end: '',
        description: '',
        color: colors.red
    })

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()

        const addingData: CreateTaskData = {
            start: formState.start,
            end: formState.end,
            name: formState.name,
            description: formState.description,
            color: formState.color,
            completed: false,
            progress: 0
        }

        try {
            await validateTaskCreateData(addingData)
            await task.add(addingData)
            await task.fetch()
            p.close()
        } catch (e: any) {
            console.error(e)
        }

    }

    return (
        <Modal close={p.close} open={p.open}>
            <form action="#" onSubmit={submitHandler}>
                <label htmlFor="task-name-input">
                    <Typography.Text className={s.label}>Название задачи</Typography.Text>
                    <TextInput
                        id="task-name-input"
                        placeholder="Введите..."
                        value={formState.name}
                        setValue={(v: string) => setFormState({...formState, name: v})}
                        className={s.text_input}
                    />
                </label>

                <div className={s.dates}>
                    <div>
                        <Typography.Text className={s.label}>Начало</Typography.Text>
                        <DatePicker
                            value={formState.start}
                            setValue={(v: string) => setFormState({...formState, start: v})}
                        />
                    </div>
                    <div>
                        <Typography.Text className={s.label}>Конец</Typography.Text>
                        <DatePicker
                            value={formState.end}
                            setValue={(v: string) => setFormState({...formState, end: v})}
                        />
                    </div>
                </div>

                <label htmlFor="task-description-input">
                    <Typography.Text className={s.label}>Описание</Typography.Text>
                    <Textarea
                        id="task-description-input"
                        value={formState.description}
                        setValue={(v: string) => setFormState({...formState, description: v})}
                        className={s.textarea}
                    />
                </label>

                <div>
                    <Typography.Text className={s.label}>Цвет</Typography.Text>
                    <div className={s.color_container}>
                        {
                            Object.values(colors).map(i => (
                                <ColorPick
                                    value={i}
                                    checked={i === formState.color}
                                    onChange={() => setFormState({...formState, color: i})}
                                    key={i}
                                />
                            ))
                        }
                    </div>
                </div>
                <Button>Добавить</Button>
            </form>
        </Modal>
    );
};