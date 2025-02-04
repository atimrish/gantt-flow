import {Modal} from "@src/shared/ui/modal";
import {ModalProps} from "@src/shared/ui/modal/Modal";
import {TextInput} from "@src/shared/ui/text-input/TextInput";
import {Typography} from "@src/shared/ui/typography";
import {DatePicker} from "@src/widgets/date-picker";
import * as s from './CreateTaskModal.css'
import {Textarea} from "@src/shared/ui/textarea/Textarea";
import {colors} from '@src/shared/config'
import {Button} from "@src/shared/ui/button";
import {ColorPick} from "@src/widgets/create-task-modal/ui/color-pick/ColorPick";
import {useRootContext} from "@src/app/providers/rootProvider";
import {CreateTaskData} from "@src/entities/task/api/createTask";
import {ICreateTaskForm} from "@src/widgets/create-task-modal/model";
import {observer} from "mobx-react";
import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";

export const CreateTaskModal = observer((p: ModalProps) => {
    const {task} = useRootContext()

    const {handleSubmit, control} = useForm<ICreateTaskForm>({
        defaultValues: {
            color: colors.red
        }
    })

    const onSubmit: SubmitHandler<ICreateTaskForm> = async (data, e) => {
        e?.preventDefault()
        const addingData: CreateTaskData = {
            ...data,
            progress: 0,
            completed: false
        }

        await task.add(addingData)
        await task.fetch()
        p.close()
    }

    const onError: SubmitErrorHandler<ICreateTaskForm> = (errors, e) => {
        e?.preventDefault()
    }

    return (
        <Modal close={p.close} open={p.open}>
            <form action="#" onSubmit={handleSubmit(onSubmit, onError)}>
                <label htmlFor="task-name-input">
                    <Typography.Text className={s.label}>Название задачи</Typography.Text>
                    <Controller
                        name={'name'}
                        control={control}
                        rules={{
                            required: {
                                message: 'Это поле обязательно к заполнению',
                                value: true
                            }
                        }}
                        render={({field}) => (
                            <TextInput
                                id="task-name-input"
                                placeholder="Введите..."
                                value={field.value}
                                setValue={field.onChange}
                                className={s.text_input}
                            />
                        )}
                    />
                </label>

                <div className={s.dates}>
                    <div>
                        <Typography.Text className={s.label}>Начало</Typography.Text>
                        <Controller
                            name={'start'}
                            control={control}
                            rules={{
                                required: {
                                    message: 'Это поле обязательно к заполнению',
                                    value: true
                                }
                            }}
                            render={({field}) => (
                                <DatePicker
                                    value={field.value}
                                    setValue={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Typography.Text className={s.label}>Конец</Typography.Text>
                        <Controller
                            name={'end'}
                            control={control}
                            rules={{
                                required: {
                                    message: 'Это поле обязательно к заполнению',
                                    value: true
                                }
                            }}
                            render={({field}) => (
                                <DatePicker
                                    value={field.value}
                                    setValue={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>

                <label htmlFor="task-description-input">
                    <Typography.Text className={s.label}>Описание</Typography.Text>
                    <Controller
                        name={'description'}
                        control={control}
                        render={({field}) => (
                            <Textarea
                                id="task-description-input"
                                value={field.value}
                                setValue={field.onChange}
                                className={s.textarea}
                            />
                        )}
                    />
                </label>

                <div>
                    <Typography.Text className={s.label}>Цвет</Typography.Text>
                    <div className={s.color_container}>
                        <Controller
                            name={'color'}
                            control={control}
                            render={({field}) => (
                                <>
                                    {
                                        Object.values(colors).map(i => (
                                            <ColorPick
                                                value={i}
                                                checked={i === field.value}
                                                onChange={field.onChange}
                                                key={i}
                                            />
                                        ))
                                    }
                                </>
                            )}
                        />
                    </div>
                </div>
                <Button>Добавить</Button>
            </form>
        </Modal>
    );
})